/* eslint-disable no-import-assign */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadRouter';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
// const aws = require('aws-sdk');

const storage = multer.memoryStorage()
const upload = multer({ storage })
const {aws,s3} = require('./config');

/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
// aws.config.region = 'us-east-1';

/*
 * Load the S3 information from the environment variables.
 */
const {S3_BUCKET} = "niyastore";

app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));

/* app.get('/sign-s3', (req, res) => {
  console.log("In sign-s3");
  const s3 = new aws.S3();
  // console.log(req);

  const fileName = req.file.name;
  console.log("fileName");
  console.log(`filename: ${fileName}`);
  // const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: 'jpg',
    ACL: 'public-read'
  };

  // eslint-disable-next-line consistent-return
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    console.log(data);
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    console.log('{S3_BUCKET}:',`${S3_BUCKET}`)
    console.log('returnData:',returnData);
    res.write(JSON.stringify(returnData));
    res.end();
  });
}); */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(config.PORT, () => {
  console.log('serve at http://localhost:5003');
});

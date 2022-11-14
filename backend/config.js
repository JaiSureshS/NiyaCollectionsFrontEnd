import dotenv from 'dotenv';

dotenv.config();

const aws = require('aws-sdk');


aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION // region of your bucket
});

const s3Config = new aws.S3();


export default {
	PORT: process.env.PORT || 5003,
	MONGODB_URL: process.env.MONGODB_URL,
	JWT_SECRET: process.env.JWT_SECRET,
	aws,
    s3Config,
    s3bucket:process.env.S3_BUCKET
};
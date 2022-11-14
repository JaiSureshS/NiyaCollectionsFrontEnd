/* import express from 'express';
import multer from 'multer';
 import { isAuth, isAdmin } from '../utils';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });
const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({ image: `/${req.file.path}` });
});

export default uploadRouter; */

/* const multerS3 = require('multer-s3');
const multer = require('multer');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const {s3Config,s3bucket} = require('../config');

const uploadRouter = express.Router();


uploadRouter.get('/', (req, res) => {
res.sendFile(`${__dirname  }/index.html`);
})

const multerUpload = multer({
    storage: multerS3({
    s3: s3Config,
    acl: 'public-read',
    bucket: s3bucket,
    key (_req, file, cb) {
        console.log(file);
        cb(null, file.originalname); // use Date.now() for unique file keys
    }
  })
  });




  uploadRouter.post('/upload', multerUpload.array('upl', 25), (req, res) => {
  res.send({
      message: "Uploaded!",
      urls: req.files.map((file) => ({url: file.location, name: file.key, type: file.mimetype, size: file.size}))
  });
}); */

import express from 'express'

import multer from 'multer'
import sharp from 'sharp'

import { uploadFile } from './s3'


const storage = multer.memoryStorage()
// eslint-disable-next-line object-shorthand
const upload = multer({ storage: storage })

const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('image'), async (req, res) => {
  console.log("In /upload")
  // console.log(req)
  const {file} = req
  // const {caption} = req.body
  const imageName = `${req.file.originalname}${Date.now()}`

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

  await uploadFile(fileBuffer, imageName, file.mimetype)

  
  res.status(201).send({ image: `${imageName}` });
})

export default uploadRouter;

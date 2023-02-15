const service = require('../services/user')
const { catchAsync } = require('../helpers/request');
const fs=require('fs')
const path=require('path');
const cloudinary = require('../cloudinary/cloudinary');
//const file = require('../cloudinary/cloudinary')
const fileUpload = require('express-fileupload')
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const multers = require('../middleware/multer');

//create user
exports.createUser = catchAsync(async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    phone: req.body.phone,
 
  };
  res.body = await service.createUser(payload);
  return res.json(res.body);
});


//login user
exports.loginUser = catchAsync(async (req, res, next) => {

  const payload = {

    email: req.body.email,
    password: req.body.password,
    fromPortal: req.body.fromPortal || false,
  };
  res.body = await service.loginUser(payload);
  return res.json(res.body);
});



// create post
exports.createPost = catchAsync(async (req, res, next) => {
  const payload = {

    userId: req.body.userId,
    file: req.body.file,
    postType: req.body.file,
  };
  console.log(payload)
  res.body = await service.createPost(payload);
  return res.json(res.body);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload ({
  useTempFiles: true
  
}))
//upload image
exports.uploadImage = catchAsync(async (req, res, next) =>{
  const id = req.params.id;
  console.log(id);
  const payload = {
    userId: id,
    file:  req.imageURL //req.file.path
  }
  console.log(payload);
  res.body = await service.uploadImage(payload)
  return res.json(res.body)
})




/* 
  
  console.log(payload);
  res.files = await service.uploadImage(payload);
  return res.json(res.files)
}


exports.uploadImage async (req, res, next) => {

 */
/* onst file = req.files.image
console.log(file); 
try {
    const result = await cloudinary.uploader.upload(file.tempFilePath  , {
       folder: 'photos'
    })
    console.log(result);
    const hammadBio = new imageModel({
        image : {
            public_id: result.public_id,
            url: result.url
        }
    });
    const results = await hammadBio.save();
    //res.send(result)
} catch (error) {
    console.log(error)
}
// res.render('profile')
}) */
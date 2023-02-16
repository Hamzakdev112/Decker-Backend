const postRepo = require('../repositories/post');
const userRepo = require('../repositories/user');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
// joi 
const joi = require('../validations/joi');
const joiSchema = require('../validations/schema/post');


// create user 
exports.createUser = async (payload) => {
  //  joi.validate(payload, joiSchema.post);
  //   const passwordHash = await bcrypt.hash(payload.password, bcryptSalt);
  let user;
  const createPayload = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    gender: payload.gender,
    password: payload.password,
    phone: payload.phone,
    image: payload.image,
  };
  user = await userRepo.create(createPayload);
  return {
    id: user._id,
    success: true,
  };
};

//login user
exports.loginUser = async (payload) => {
  let user;
  // let expiresIn = '99y';
  if (payload.fromPortal) {
    user = await userRepo.findByEmail(payload.email);
    errorMessage = "error";
    //   expiresIn = '1d';
  } else {
    user = await userRepo.findByPassword(payload.password);
  }
  if (!user) {
    throw "user not found";
  }
  const token = jwt.sign({ id: user._id }, "avc");

  // console.log(token);
  return token;
};

// create post
exports.createPost = async (payload) => {
  //  joi.validate(payload, joiSchema.post);
  const createPayload = {
    user: payload.user,
    postType: payload.postType,
    file: payload.file,
  };
  await postRepo.create(createPayload);
  return {
    success: true,
  };
};
exports.uploadImage = async (payload) =>{
  const createpayload = {
    userID: payload.userId,
    image: payload.file
  }
  
  await userRepo.UploadImage(createpayload)
  //console.log(createpayload.image);
  return{
    success:true
  }
}


app.use(fileUpload ({
  useTempFiles: true,
}))


/* exports.uploadImage = async (payload) => {
  const result = await cloudinary.uploader.upload(payload.tempFilePath  ,  {
      public_id: payload.public,
      resource_type:  payload.resourceType,
      folder: 'images'
  }) 
  const createPayload = ({
    image : {
        public_id: result.public_id,
        url: result.url
    }
});
  await userRepo.uploadImage(createPayload);
} */

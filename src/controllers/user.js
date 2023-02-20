const service = require("../services/user");
const { catchAsync } = require("../helpers/request");

const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

exports.createUser = catchAsync(async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    phone: req.body.phone,
    image: req.body.imageURL,
  };

  res.body = await service.createUser(payload);
  return res.json(res.body);
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
    fromPortal: req.body.fromPortal || false,
  };

  const options = {
    expires: new Date(Date.now() + 86400000 * 5),
    httpOnly: true,
  };
  res.body = await service.loginUser(payload);
  return res
    .cookie("token", res.body, options)
    .json({ message: "user logged in" });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const payload = {
    // userId: req.body.userId,
    user: req.user._id,
    file: req.body.file,
    postType: req.body.postType,
  };

  res.body = await service.createPost(payload);
  return res.json(res.body);
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

exports.uploadImage = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const payload = {
    userId: id,
    file: req.imageURL,
  };
  console.log(payload);
  res.body = await service.uploadImage(payload);
  return res.json(res.body);
});

exports.userLevel = catchAsync(async (req, res, next) => {
  const { userType } = req.params;

  const payload = {
    ...req.body,
    userType:userType,
    userId: req.user._id,
  };
  res.body = await service.userLevel(userType, payload);
  return res.json(res.body);
});

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

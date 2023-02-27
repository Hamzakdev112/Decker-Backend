const { catchAsync } = require("../helpers/request");
const userService = require('../services/user')
const userService = require("../services/user");
const friendRequest = require("../models/schema/friendRequest");
const fileUpload = require("express-fileupload");


const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(fileUpload ({
  useTempFiles: true
  
}))
// REGISTER A USER



exports.createUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  res.body = await userService.createUser(payload);

  res.json(res.body);
});

//LOGIN A USER
exports.loginUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  res.body = await userService.loginUser(payload);
  if (res.body.user.success === true) {
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000 * 2), // 2 days
    };
    res
      .cookie("token", res.body.user.token, options)
      .status(200)
      .json(`LOGGED IN`);
  } else {
    res.status(500).json(res.body);
  }
});

//UPDATE PROFILE PICTURE

exports.uploadImage = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const imageUrl = req.imageURL;
  console.log(id);
  const payload = {
    userId: id,
    file: req.body.imageURL,
  };
  console.log(payload);
  res.body = await userService.uploadImage(payload);
  return res.json(res.body);
});

//UPDATE USER LEVEL

exports.userLevel = catchAsync(async (req, res, next) => {
  const { userType } = req.params;

  const payload = {
    ...req.body,
    userId: req.user,
  };
  res.body = await userService.userLevel(userType, payload);
  return res.json(res.body);
});

//GET ALL USERS

exports.getAllUsers = catchAsync(async (req, res, next) => {
  res.body = await userService.getAllUsers();

  res.status(200).json(res.body);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  const payload = {
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    userId: req.user,
  };
  res.body = await userService.updatePassword(payload);
  return res.json(res.body);
});

// friend request
exports.friendRequest = catchAsync(async (req, res, next) => {
  const payload = {
    myId: req.user,
    userId: req.params.id, // friend which we want to send request
  };
  console.log(payload);
  res.body = await userService.friendRequest(payload);
  res.json(res.body);
});

// check request
exports.checkRequest = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const id = req.user.toString();
  const payload = {
    Id: id,
  };
  res.body = await userService.checkRequest(payload);
  res.json(res.body);
});

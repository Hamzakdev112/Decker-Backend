const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const userController = require('../controllers/user');
const multer = require('../middleware/multer');
const {verifyUser} = require('../middleware/auth')
// const {sendOTP}=require('../controllers/firebase')

//Auth
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

//Update Profile Picture
router.put('/updateprofile/:id', multer ,userController.uploadImage)

//UPDATE USER LEVEL
router.put('/level/:userType',verifyUser ,userController.userLevel)

//GET ALL USERS
router.get('/all', userController.getAllUsers )
module.exports=router
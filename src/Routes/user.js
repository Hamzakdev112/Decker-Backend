const express = require('express')
// const multer = require('multer')
const router=express.Router()
const userController=require('../controllers/user')
const multers = require('../middleware/multer');
const loginUser = require ("../middleware/loginUser")

router.post('/post',loginUser, userController.createPost)


router.post('/signUp',multers, userController.createUser)


router.get('/login', userController.loginUser)

router.put('/upload/:id', multers ,userController.uploadImage)

router.put('/sample/:userType',loginUser,userController.userLevel)


module.exports = router;
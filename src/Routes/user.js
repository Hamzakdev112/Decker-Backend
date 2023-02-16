const express = require('express')
// const multer = require('multer')
const router=express.Router()
const userController=require('../controllers/user')
const multers = require('../middleware/multer');
const loginUser = require ("../middleware/loginUser")

router.post('/post',loginUser, userController.createPost)

//(create user route)
router.post('/signUp',multers, userController.createUser)


//(login user)
router.get('/login', userController.loginUser)

//router.post('/upload', multer().single('image') ,userController.uploadImage)
router.put('/upload/:id', multers ,userController.uploadImage)
//
// router.post('/upload-Image',userController.uploadImage)


module.exports = router;
const express = require('express')
const router=express.Router()
const likeController=require('../controllers/like')
const {verifyUser}  = require('../middleware/auth')
router.post('/:postType/:postId',verifyUser,likeController.like)
module.exports = router;
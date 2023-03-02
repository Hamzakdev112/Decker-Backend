const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const {verifyUser}  = require('../middleware/auth')


//NEW POST
router.post('/new/:postType', verifyUser ,postController.createPost)

router.post('/share/:postType/:postId',verifyUser,postController.sharePost)




module.exports = router;
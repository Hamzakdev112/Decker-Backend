const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const {verifyUser}  = require('../middleware/auth')

//NEW POST
router.post('/new/:postType', verifyUser ,postController.createPost)





module.exports = router;
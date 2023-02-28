const express = require('express')
const router=express.Router()
const commentController=require('../controllers/comment')
const {verifyUser}  = require('../middleware/auth')
router.post('/:postType',verifyUser, commentController.createComment)
router.delete('/:id',verifyUser,commentController.deleteComment)
router.put('/:id',verifyUser,commentController.updateComment)
router.get('/:postType/:postId',verifyUser, commentController.getComments)
module.exports = router;
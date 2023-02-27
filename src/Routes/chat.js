const router = require('express').Router();
const chatController = require('../controllers/chat')
const {verifyUser}  = require('../middleware/auth')

//CONVERSATION
//get single conversation
router.get('/conversation/:conversationId/:receiverId',verifyUser, chatController.getConversation)
// get all conversations of user
router.get('/conversation/all', verifyUser, chatController.getAllConversations)


//MESSAGES
//CREATE A MESSAGE
router.post("/message/:receiverId", verifyUser, chatController.createMessage);
//DELETE A MESSAGE
router.delete("/message/:messageId", verifyUser, chatController.deleteMessage);




module.exports = router;
const chatRepo = require('../repositories/chat')
const conversationModel = require('../models/schema/conversation')



exports.createMessage = async (payload) =>{
    let conversation = await conversationModel.findOne({
        members:{$all: [payload.user, payload.receiverId]}
    })
    if(!conversation){
        conversation = await conversationModel.create({
            members: [payload.user, payload.receiverId],
        })
    }
    const message = await chatRepo.createMessage({
        senderId: payload.user,
        conversationId: conversation._id,
        text: payload.text,
    })
    return {
        success:true,
        message
    }
}
exports.deleteMessage = async (payload) =>{
    const message = await chatRepo.getMessageById(payload.messageId)
    if(!message)return {success:false, message: "message not found"}
    if(payload.user.toString() != message.senderId.toString()) return {success:false, message:"you can't delete others messages"}
    await message.deleteOne()
    return {
        success:true,
        message: "message deleted"
    }
}






exports.getConversation = async (payload) =>{
    const conversation = await chatRepo.getConversation(payload)
    if(!conversation) return {
        success: false,
        message: "This conversation does not exist"
    }
    const messages =await chatRepo.getMessagesByConversationId(conversation._id,5, payload.page)
    return {
        success:true,
        conversation,
        messages
    }
    }
exports.getAllConversations = async (payload) =>{
    const conversations = await chatRepo.getAllConversations({
            members:{ $in:[payload.user]} 
    }, payload.page)
    if(!conversations) return {
        success: false,
        message: "This user does not have any conversation"
    }
    return {
        success:true,
        conversations,
    }
    }
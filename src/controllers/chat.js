const { catchAsync } = require("../helpers/request");
const chatService = require('../services/chat')

exports.createMessage =  catchAsync(async(req,res)=>{
    const {user} = req
    const {receiverId} = req.params
    if(receiverId == user)return res.status(500).json({success:false, message: "You can't message yourself"})
    const payload = {user, receiverId, ...req.body}
    res.body = await chatService.createMessage(payload)
    res.json(res.body)
})

exports.deleteMessage =  catchAsync(async(req,res)=>{
    const {user} = req
    const {messageId} = req.params
    const payload = {user, messageId}
    res.body = await chatService.deleteMessage(payload)
    res.json(res.body)
})

exports.getConversation = catchAsync( async(req, res, next)=>{
    const {user} = req
    const {conversationId, receiverId} = req.params
    if(receiverId == user) return res.status(500).json({success:false, message:'ERROR OCCURED'})
    const {page} = req.query
    const payload = {user, page, conversationId, receiverId}
    res.body = await chatService.getConversation(payload)
    res.json(res.body)
})

exports.getAllConversations = catchAsync( async(req, res, next)=>{
    const {user} = req
    const {page} = req.query
    const payload = {user, page}
    res.body = await chatService.getAllConversations(payload)
    res.json(res.body)
})
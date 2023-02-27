const conversationModel = require('../models/schema/conversation')
const messageModel = require('../models/schema/message')


exports.createMessage = (payload)=>{
    return messageModel.create(payload)
}
exports.getMessagesByConversationId = (conversationId, resultsperPage, page)=>{
    return messageModel
    .find({conversationId})
    .limit(resultsperPage)
    .skip(resultsperPage *(page -1))
    .sort({createdAt: -1})
}
exports.getMessageById = (payload)=>{
    return messageModel.findById(payload)
    
}

exports.createConversation = async(payload)=>{
    return conversationModel.create(payload)
}

exports.getConversation = async(payload, )=>{
    return conversationModel.findOne({
        $and :[
            {members:{ $all:[payload.user,payload.receiverId]} }, {_id: payload.conversationId}
        ]
    }).populate({
        path: 'members',
        match: {_id: {$in: [payload.user, payload.receiverId]}} ,
        select: "_id firstName lastName"  
    })
}

exports.getAllConversations = async(payload, page) =>{
    return conversationModel.find(payload).limit(10).skip(10 * (page -1)).sort({createdAt: -1})
}
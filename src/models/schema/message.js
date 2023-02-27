const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type: String,
    }


}, {
    timestamps: true
});


module.exports = new mongoose.model("Message",MessageSchema)
const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({

    members:{
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: true,
    }


});


module.exports = new mongoose.model("Conversation",ConversationSchema)
const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
    userId_sendrequest: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    userId_reciever: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: false
    }
})
const friendRequests = mongoose.model('friendRequsts', friendRequestSchema)
module.exports = friendRequests
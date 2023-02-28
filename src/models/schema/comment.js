const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",
        require:true
    },
    postType:{
        type:String,
        require:true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"comment",
        require:true
    },
    postedDate: {type: Date, default: Date.now},
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
        require:true
    },
    commentText: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Comments', commentSchema);
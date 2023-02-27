const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    require: true,
  },
  postedDate: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  type:{
    type:String,
    require:true
  }
});

module.exports = new mongoose.model("likes", likeSchema);
const mongoose = require("mongoose");

const createPostSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postType: {
    type: String,
    required: true,
  },
  file: {
    type: Boolean,
    required: true,
  },
})
const createPost = new mongoose.model("Posts", createPostSchema);

module.exports = createPost;
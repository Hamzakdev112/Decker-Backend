const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter project name"],
    },
    description: {
      type: String,
      required: [true, "Please enter project description"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please enter job userId"],
    },
    postType: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: [true, "Please enter skills required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please enter how do you want to pay"],
    },
    MinRange: {
      type: Number,
    },
    MaxRange: {
      type: Number,
    },
    deadline: {
      type: Date,
    },
    Currency: {
      type: String,
    },
    sharedBy: {
      type: mongoose.Types.ObjectId,
      required: false,
    },

    comments: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project_Posts", projectSchema);

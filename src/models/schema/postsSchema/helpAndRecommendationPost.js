const mongoose = require("mongoose");

const helpAndRecommendationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter subject"],
    },
    description: {
      type: String,
      required: [true, "Please enter job description"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please enter job userId"],
    },
    postType: {
      type: String,
      required: true,
    },
    image: {
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
    reacts: {
      like: {
        type: Number,
        default: 0,
      },
      haha: {
        type: Number,
        default: 0,
      },
      cry: {
        type: Number,
        default: 0,
      },
      care: {
        type: Number,
        default: 0,
      },
      love: {
        type: Number,
        default: 0,
      },
      wow: {
        type: Number,
        default: 0,
      },
      angry: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Help_Posts", helpAndRecommendationSchema);

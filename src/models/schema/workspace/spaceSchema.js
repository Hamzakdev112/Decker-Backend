const mongoose = require("mongoose");
const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your workspace name"],
      unique: true,
    },
    description: {
      type: String,
    },
    columns: {
      name: { type: Boolean, width: 150,default:true },
      assignee: { type: Boolean, width: 150,default:true },
      dueDate: { type: Boolean, width: 150,default:true },
      priority: { type: Boolean, width: 150,default:true },
      status: { type: Boolean, width: 150,default:true },
      timer: { type: Boolean, width: 150,default:false },
    },
    creator: {
      type: String,
      required: true,
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    admins: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: [true, "there must be atleast 1 admin"],
    },
    moderators: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Spaces", spaceSchema);

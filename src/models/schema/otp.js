const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    otp:{
        type: Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // Documents will expire 60 seconds after createdAt time
      }
});


module.exports = new mongoose.model("OTP",otpSchema)
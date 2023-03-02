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
    retries:{
        type: Number,
        default: 3
    }
},{
    timestamps:true,
    expires: 300
});


module.exports = new mongoose.model("OTP",otpSchema)
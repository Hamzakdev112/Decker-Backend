const mongoose = require("mongoose");

const createPaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  amount:{
    type:Number,
    required:true
  }
});


const createPayment = new mongoose.model("Payment",createPaymentSchema)
module.exports = createPayment;
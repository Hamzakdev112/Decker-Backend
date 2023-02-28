const express = require("express"); 
const router = express.Router(); 
const paymentController = require("../controllers/payment"); 
const {verifyUser} = require('../middleware/auth') 
  
router.post("/create", verifyUser, paymentController.createPayment); 
  
 module.exports = router;
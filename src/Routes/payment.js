const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const loginUser = require("../middleware/loginUser");

router.post("/payment", loginUser, paymentController.createPayment);

module.exports = router;
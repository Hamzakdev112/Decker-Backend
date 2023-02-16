const paymentRepo = require("../repositories/payment");
const express = require("express");
const app = express();

exports.createPayment = async (payload) => {
  const createPayload = {
    amount: payload.amount,
    user: payload.user,
  };
  await paymentRepo.create(createPayload);
  return {
    success: true,
  };
};

const paymentRepo = require("../repositories/payment");
const express = require("express");
const app = express();

exports.createPayment = async (payload) => {
  const createPayload = {
    amount: payload.amount,
    description:payload.description,
    user: payload.user,
    email:payload.email
  };
  await paymentRepo.create(createPayload);
  return {
    success: true,
  };
};
const { catchAsync } = require('../helpers/request');
const service = require ("../services/payment")

const express = require('express')
const app = express()
const multers = require('../middleware/multer');


exports.createPayment = catchAsync(async(req,res,next))
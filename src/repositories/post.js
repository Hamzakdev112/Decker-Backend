const productModel = require('../models/schema/productPost');
const jobModel = require('../models/schema/jobPost');

exports.createProductPost = (payload) => {
    return productModel.create(payload) 
  };
  
exports.createJobPost = (payload) => {
    return jobModel.create(payload) 
  };
  

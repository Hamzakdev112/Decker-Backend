const productModel = require('../models/schema/postsSchema/productPost');
const jobModel = require('../models/schema/postsSchema/jobPost');
const courseModel = require('../models/schema/postsSchema/coursePost');
const serviceModel = require('../models/schema/postsSchema/servicePost');
const helpModel = require('../models/schema/postsSchema/helpAndRecommendationPost');
const articleModel = require('../models/schema/postsSchema/articlePost');
const generalModel = require('../models/schema/postsSchema/generalPost');
const ideaModel = require('../models/schema/postsSchema/IdeaPost');

exports.createGeneralPost = (payload) => {
  return generalModel.create(payload) 
};

exports.createProductPost = (payload) => {
    return productModel.create(payload) 
  };
  
exports.createJobPost = (payload) => {
    return jobModel.create(payload) 
  };
  
exports.createCoursePost = (payload) => {
    return courseModel.create(payload) 
  };
  
exports.createServicePost = (payload) => {
    return serviceModel.create(payload) 
  };

exports.createHelpPost = (payload) => {
    return helpModel.create(payload) 
  };
  
exports.createArticlePost = (payload) => {
    return articleModel.create(payload) 
  };
  
exports.createIdeaPost = (payload) => {
    return ideaModel.create(payload) 
  };
  

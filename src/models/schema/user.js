const mongoose = require("mongoose");

const createUserSchema = new mongoose.Schema({
  googleId:{
    type: String,
  },
  displayName:{
    type:String
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  userType :{
    type:String
  },
  education:{
    type:String
  },
  domain:{
    type:String
  },
  reason:{
    type:String
  },
  
  jobStatus:{
    type:Boolean
  },
  futureInterest:{
    type:String
  },
  enterpriseName:{
    type:String
  },
  enterpriseSize:{
    type:String
  },
  startupName:{
    type:String
  },
  startupSize:{
    type:String
  }
});

const createUser = new mongoose.model("User", createUserSchema);

module.exports = createUser;

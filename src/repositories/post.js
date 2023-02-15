const postModel=require('../models/schema/post')
// const userModel=require('../models/schema/user')


exports.create = async (payload) => {
    return postModel.create(payload);
  };
  
//   exports.createU=async(payload)=>{
//     return userModel.create(payload)
    
// }

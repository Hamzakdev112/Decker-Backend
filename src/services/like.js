const {likePost}=require('../repositories/like')
exports.like=async(payload)=>{
    const result= await likePost(payload)
     return result
 }
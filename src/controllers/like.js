const likeService=require('../services/like')
const { catchAsync } = require("../helpers/request");
exports.like=catchAsync(async(req,res,next)=>{
    const payload={
        postType:req.params.postType,
        postId:req.params.postId,
        author:req.user._id,
        type:req.body.type
    }
    res.body=await likeService.like(payload)
    res.json(res.body)
})
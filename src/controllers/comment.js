const service = require('../services/comment')
const { catchAsync } = require('../helpers/request');
const express = require('express')
const app = express()
exports.createComment = catchAsync(async (req, res, next) => {
  const payload = {
    postType:req.params.postType,
    postId: req.body.postId,
    author: req.user._id,
    commentText: req.body.comment,
    parentId: req.body.parentId || null
  };

  res.body = await service.createComment(payload);
  return res.json(res.body);
});
exports.getComments = catchAsync(async (req, res, next) => {
    const {postId}=req.params
    res.body = await service.getComments(postId);
    return res.json(res.body);
  });
exports.deleteComment=catchAsync(async(req,res,next)=>{
  const {id}=req.params

  res.body=await service.deleteComment(id)
  return res.json(res.body)
})
exports.updateComment=catchAsync(async(req,res,next)=>{
  const {id}=req.params
  const {text}=req.body
  res.body=await service.updateComment({id,text})
  return res.json(res.body)
})
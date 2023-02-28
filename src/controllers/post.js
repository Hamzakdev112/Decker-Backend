const { catchAsync } = require("../helpers/request");
const postService = require('../services/post')


exports.createPost = catchAsync( async(req, res, next)=>{

    const { postType } = req.params
    const payload = {...req.body, userId: req.user}

    res.body = await postService.createPost(postType, payload)
    res.json(res.body)
})
exports.sharePost = catchAsync( async(req, res, next)=>{
    const payload = {...req.params, userId: req.user}
    res.body = await postService.sharePost(payload)
    res.json(res.body)
})
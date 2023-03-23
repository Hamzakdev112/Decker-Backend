const { catchAsync } = require("../helpers/request");
const roadmapService = require('../services/roadmap')

exports.createRoadmap = catchAsync(async(req,res)=>{
    const {user:creator} = req
    const payload = {...req.body,creator}
    res.body = await roadmapService.createRoadmap(payload)
    res.status(res.body.status).json(res.body)
})

exports.createNode = catchAsync(async(req,res)=>{
    // const {user:creator} = req
    const payload = {...req.body}
    res.body = await roadmapService.createNode(payload)
    res.status(res.body.status).json(res.body)
})
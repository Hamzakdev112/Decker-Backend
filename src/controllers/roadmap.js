const { catchAsync } = require("../helpers/request");
const roadmapService = require('../services/roadmap')

exports.createRoadmap = catchAsync(async(req,res)=>{
    const {user:creator} = req
    const payload = {...req.body,creator}
    res.body = await roadmapService.createRoadmap(payload)
    res.status(res.body.status).json(res.body)
})
exports.getRoadmap = catchAsync(async(req,res)=>{
    res.body = await roadmapService.getRoadmap()
    res.status(res.body.status).json(res.body)
})

exports.createNode = catchAsync(async(req,res)=>{
    // const {user:creator} = req
    const {roadmapId, parentId} = req.params
    const payload = {...req.body,roadmapId, parentId}
    res.body = await roadmapService.createNode(payload)
    res.status(res.body.status).json(res.body)
})

exports.getAllNodes = catchAsync(async(req,res)=>{
    const {roadmapId} = req.params
    const payload = {roadmapId}
    res.body = await roadmapService.getAllNodes(payload)    
    res.status(res.body.status).json(res.body)

})
exports.deleteNode = catchAsync(async(req,res)=>{
    const {roadmapId, nodeId} = req.params
    const payload = {roadmapId, nodeId}
    res.body = await roadmapService.deleteNode(payload)   
    res.status(res.body.status).json(res.body)
})
exports.createNodeContent = catchAsync(async(req,res)=>{
    const {nodeId} = req.params
    const payload = {nodeId, ...req.body}
    res.body = await roadmapService.createNodeContent(payload)   
    res.status(res.body.status).json(res.body)

})
exports.getNodeContent = catchAsync(async(req,res)=>{
    const {nodeId} = req.params
    const payload = {nodeId}
    res.body = await roadmapService.getNodeContent(payload)   
    res.status(res.body.status).json(res.body)

})

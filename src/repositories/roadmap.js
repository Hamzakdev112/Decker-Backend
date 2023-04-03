const roadmapModel = require('../models/schema/roadmap/roadmap')
const nodeModel = require('../models/schema/roadmap/node')
const contentModel = require('../models/schema/roadmap/content')


exports.createRoadmap = (payload)=>{
    return roadmapModel.create(payload)
}
exports.getRoadmap = (payload)=>{
    return roadmapModel.find()
}
exports.createNode = (payload)=>{
    return nodeModel.create(payload)
}
exports.getAllNodes = async(roadmapId)=>{
    return await nodeModel.find({roadmapId}).limit(6).lean()
}
exports.findChildNodes = (nodeId)=>{
    return nodeModel.find({parentId:nodeId}).select("_id").lean()
}

exports.deleteNodesWithChilds = (childIds) =>{
    return nodeModel.deleteMany({_id: {$in:childIds}})
}
exports.createNodeContent = (payload) =>{
    return contentModel.create(payload)
}
exports.getNodeContent = (payload) =>{
    return contentModel.findOne({nodeId:payload.nodeId})
}
const roadmapModel = require('../models/schema/roadmap/roadmap')
const nodeModel = require('../models/schema/roadmap/node')


exports.createRoadmap = (payload)=>{
    return roadmapModel.create(payload)
}

exports.createNode = (payload)=>{
    return nodeModel.create(payload)
}
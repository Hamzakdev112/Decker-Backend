const roadmapModel = require('../models/schema/roadmap/roadmap')


exports.createRoadmap = (payload)=>{

    return roadmapModel.create(payload)


}
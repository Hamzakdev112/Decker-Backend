const roadmapRepo = require('../repositories/roadmap')

exports.createRoadmap =async (payload)=>{
    const roadmap = await roadmapRepo.createRoadmap(payload)
    return {
        success:true,
        status:200,
        roadmap
    }

}
exports.createNode =async (payload)=>{
    const node = await roadmapRepo.createNode(payload)
    return {
        success:true,
        status:200,
        node
    }

}
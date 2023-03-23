const roadmapRepo = require('../repositories/roadmap')

exports.createRoadmap =async (payload)=>{
    const roadmap = await roadmapRepo.createRoadmap(payload)
    return {
        success:true,
        status:200,
        roadmap
    }

}
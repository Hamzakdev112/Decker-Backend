const SpaceModel = require('../models/schema/workspace/spaceSchema')
const TaskModel = require('../models/schema/workspace/taskSchema')



exports.createSpace = (payload)=>{
    return SpaceModel.create(payload)
}

exports.getSpaceById = (payload)=>{
    return SpaceModel.findOne(payload)
}
exports.getMembers = (payload)=>{

    return SpaceModel.findOne(payload).populate({
        path:'members',
        select: '-password -createdAt -updatedAt -verified -__v'
    }).select('members _id')

}
exports.getSpaces = (payload)=>{
    return SpaceModel.find(payload)
}
exports.getTasks = (payload)=>{
    return TaskModel.find(payload)
}

exports.createTask = (payload)=>{
    return TaskModel.create(payload)
}
exports.getTaskById = (payload) => {
    return TaskModel.findById(payload.taskId)
  };
exports.updateTask = async(payload,assigner,field, taskId) => {
    return  TaskModel.findOneAndUpdate(
        {
            $and:[
                {_id:taskId,} ,
                {assigner,} 
            ]
        },
        {[field]: payload[field]},
        {new:true,fields:{[field]:1}})
  };
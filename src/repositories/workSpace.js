const { default: mongoose } = require('mongoose')
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
exports.updateColumns =async (payload)=>{
    let space = await  SpaceModel.findOne({
        $and:[
            {creator:payload.user},
            {_id:payload.spaceId},],},{columns:1}, )
            if(space.columns.includes(payload.column)){
                space = await SpaceModel.findByIdAndUpdate(payload.spaceId, {
                    $pull: {columns: payload.column}
                },{new:true, columns:1})
                return {...space, message:`${payload.column.charAt(0).toUpperCase() + payload.column.slice(1)} Removed From Columns`}
            }
            if(!space.columns.includes(payload.column)){
                if(payload.column == "name"){
                    space = await SpaceModel.findByIdAndUpdate(payload.spaceId, {
                        $push: {columns:{$each:[payload.column],$position:0}}
                    }, {new:true, columns:1})
                    return {...space, message:`${payload.column.charAt(0).toUpperCase() + payload.column.slice(1)} Added To Columns`}
                }
                else{
                    space = await SpaceModel.findByIdAndUpdate(payload.spaceId, {
                        $push: {columns: payload.column}
                    }, {new:true, columns:1})
                    return {...space, message:`${payload.column.charAt(0).toUpperCase() + payload.column.slice(1)} Added To Columns`}
                }
    }


}
exports.getTasks = async(payload)=>{
     const space = await SpaceModel.findById(payload.spaceId).lean(); 
    const columns = space.columns.join(' ')
    return  await TaskModel.find({ spaceId: payload.spaceId }).select(columns); 

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
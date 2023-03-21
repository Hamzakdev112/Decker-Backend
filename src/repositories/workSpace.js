const SpaceModel = require('../models/schema/workspace/spaceSchema')
const TaskModel = require('../models/schema/workspace/taskSchema')
const UserModel = require('../models/schema/user')



exports.createSpace = (payload)=>{
    return SpaceModel.create(payload)
}

exports.getUserByEmail = async(payload)=>{
    return UserModel.findOne({
      email:payload.email
    }).select('_id firstName lastName email')
  }
  

exports.getSpaceById = (payload)=>{
    return SpaceModel
    .findOne(payload)
    .populate({
        path:'members',
        select:'firstName lastName _id '
    })
}
exports.getSpaceForInvite = (payload)=>{
    return SpaceModel.findById(payload).select('invites _id name')
}
exports.verifyMember = (payload,token)=>{
    const inviteQuery = {userId:payload.userId, token }
    return SpaceModel.findOneAndUpdate({
        $and:[
            {_id:payload.spaceId},
            { invites: {$elemMatch: inviteQuery }}
        ]
    },{
        $push:{members:payload.userId},
        $pull: {invites:inviteQuery}
    }, {
        new:true
    })
}
exports.getMembers = (payload)=>{

    return SpaceModel.findOne(payload).populate({
        path:'members',
        select: '-password -createdAt -updatedAt -verified -__v'
    }).select('members _id')

}
exports.getSpaces = (payload)=>{
    return SpaceModel.find(payload).select('_id name')
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
     const space = await SpaceModel.findById(payload.spaceId); 
     if(payload.search){
         return  await TaskModel.find({
        $and:[
            { spaceId: payload.spaceId},
            { name:{ $regex:payload.search, $options: "i"}},
        ]    
        })
        .populate([
            {
                path:'assignee',
                select:'_id firstName lastName'
            },
            {
                path:'assigner',
                select:'_id firstName lastName'
            }
        ])
        .sort({createdAt:-1})
        }
        else{
            return  await TaskModel.find({ spaceId: payload.spaceId })
            .populate([
                {
                    path:'assignee',
                    select:'_id firstName lastName'
                },
                {
                    path:'assigner',
                    select:'_id firstName lastName'
                }
            ])
            .sort({createdAt:-1})

        }

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
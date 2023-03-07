const workSpaceRepo = require('../repositories/workSpace')


exports.createSpace = async(payload)=>{

    const space = await workSpaceRepo.createSpace({
        name: payload.name,
        creator: payload.creator,
        members:[payload.creator, payload.members],
        admins:[payload.creator, payload.admin],
        moderators:payload.moderators,
        columns:payload.columns
    })
    return {
        status:200,
        success:true,
        space
    }

}
exports.getSpaces = async(payload)=>{
    const spaces = await workSpaceRepo.getSpaces({
        members:{$in: [payload.user]},
    })
    return {
        status:200,
        success:true,
        spaces
    }

}


exports.getSpaceById = async(payload)=>{
    const space = await workSpaceRepo.getSpaceById({
        $and:[
            {_id: payload.spaceId,},
            {members: {$in: [payload.user]}}
        ]
    })
    if(!space) return {status:404, success:false, message: "space not found"}
    return {
        status:200,
        success:true,
        space
    }

}

exports.getMembers = async(payload)=>{
    const space = await workSpaceRepo.getMembers({
        $and:[
            {_id: payload.spaceId,},
            {members: {$in: [payload.user]}}
        ]
    })
    if(!space) return {status:404, success:false, message: "space not found"}
    return {
        status:200,
        success:true,
        space
    }

}
exports.getTasks = async(payload)=>{
    const tasks = await workSpaceRepo.getTasks({
            spaceId: payload.spaceId
    })
    if(!tasks || tasks.length <= 0) return {status:404, success:false, message: "no tasks found"}
    return {
        status:200,
        success:true,
        tasks
    }
}


exports.createTask = async(payload)=>{

    const space = await workSpaceRepo.createTask({
        spaceId: payload.spaceId,
        name: payload.name,
        description:payload.description,
        assigner: payload.creator,
        assignee: payload.assignee,
        status: payload.status,
        priority: payload.priority,
        watchers: [payload.creator, payload.watchers],
        dueDate: payload.dueDate
    })
    return {
        success:true,
        space
    }

}

exports.updateTask = async (payload, assigner,field, taskId) => {
    const task = await workSpaceRepo.getTask(payload,assigner, field, taskId);
    return task
    // if (task.assigner != assigner.toString()) {
    //   return {
    //     status: 401,
    //     success: false,
    //     message: "Unauthorized to update",
    //   };
    // } else {
    //   const updatedTask = await workSpaceRepo.updateTask(taskId, payload)
    //   return {
    //     status: 200,
    //     success: true,
    //     updatedTask
    //     // updatedTask:{
    //     //     status:updatedTask.status}
    //   }  };
    
  };

  exports.getSingleTask = async (payload) => {
    const task = await workSpaceRepo.getTask(payload);
    if (task.spaceId.toString() !== payload.spaceId.toString()) {
      return {
        status: 404,
        success: false,
        message: "task not found",
      };
    } else {
      return task;
    }
  };
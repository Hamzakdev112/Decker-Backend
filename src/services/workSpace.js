const workSpaceRepo = require('../repositories/workSpace')
const crypto = require('crypto')
const sendEmail = require('../helpers/sendEmail')

exports.createSpace = async(payload)=>{

    const space = await workSpaceRepo.createSpace({
        name: payload.name,
        description:payload.description,
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


exports.getUserByEmail = async (payload)=>{
    const user = await workSpaceRepo.getUserByEmail(payload)
  
    if(!user)return {success:false,status:404,message:'No user found with this email'} 
    const workspace = await workSpaceRepo.getSpaceForInvite(payload.spaceId)
    // return {status:200,user}
    const isInvited = workspace.invites.some(invite=>invite.userId == user._id.toString())
    if(isInvited)return {success:false,status:404,message:`${user.firstName} is already invited`} 
    return {success:true,status:200,user}
  }


exports.inviteMember = async(payload)=>{

    const space = await workSpaceRepo.getSpaceForInvite(payload.spaceId)
    const token = space.generateInviteToken(payload.userId)

    const inviteUrl = `http://localhost:3000/spaces/invitation/${space._id}/${token}`
    const text = `You are invited to join ${space.name}. By clicking the link you can join the work space \n\n\n ${inviteUrl}`
    await sendEmail({
        email:payload.userEmail,
        subject: `Monster Invitation`,
        text
    })
    await space.save({validateBeforeSave:false})
    return {
        success:true,
        status:200,
        space,
        token
    }
}
exports.verifyMember = async(payload)=>{

    const token = crypto.createHash('sha256').update(payload.token).digest('hex')
    const space = await workSpaceRepo.verifyMember(payload,token)
    if(!space)return {success:false, status:500,message:'This token is either invalid or expired'}
    return {
        success:true,
        status:200,
        space,
        token,
        userId:payload.userId
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
exports.updateColumns = async(payload)=>{
    const column = await workSpaceRepo.updateColumns(payload)
    return {
        status:200,
        success:true,
        columns:column._doc.columns,
        message:column.message
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
    const tasks = await workSpaceRepo.getTasks(payload)
    if(!tasks || tasks.length <= 0) return {status:404, success:false, message: "No tasks found"}
    return {
        status:200,
        success:true,
        tasks
    }
}
exports.createTask = async(payload)=>{

    const task = await workSpaceRepo.createTask({
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
        task
    }

}

exports.updateTask = async (payload, assigner,field, taskId) => {
    const task = await workSpaceRepo.updateTask(payload,assigner, field, taskId);
    return task
  };

exports.deleteTask = async (payload) => {
    const task = await workSpaceRepo.deleteTask(payload.assigner, payload.taskId);
    return task
  };

  exports.addColumns = async(payload) =>{
    const space = await workSpaceRepo.addColumns(payload)
    return space
  }
  

  exports.getSingleTask = async (payload) => {
    const task = await workSpaceRepo.getTaskById(payload);
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
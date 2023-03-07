const { catchAsync } = require("../helpers/request");
const workSpaceService = require('../services/workSpace')

exports.createSpace = catchAsync(async (req,res,next)=>{

const {user: creator} = req
const payload = {...req.body, creator}

res.body = await workSpaceService.createSpace(payload)
res.status(res.body.status).json(res.body)
})


exports.getSpaces = catchAsync(async (req,res,next)=>{

const {user} = req
const payload = {user}
res.body = await workSpaceService.getSpaces(payload)
res.status(res.body.status).json(res.body)

})

exports.getSpaceById = catchAsync(async (req,res,next)=>{

const {user} = req
const {spaceId} = req.params
const payload = {...req.body, user, spaceId}

res.body = await workSpaceService.getSpaceById(payload)
res.status(res.body.status).json(res.body)
})

exports.getMembers = catchAsync(async (req,res,next)=>{

const {user} = req
const {spaceId} = req.params
const payload = {...req.body, user, spaceId}

res.body = await workSpaceService.getMembers(payload)
res.status(res.body.status).json(res.body)
})




exports.getTasks = catchAsync(async (req,res,next)=>{

const {user} = req
const {spaceId} = req.params
const payload = {user, spaceId} 
res.body = await workSpaceService.getTasks(payload)
res.body.status ? res
.status(res.body.status)
.json(res.body)
:
res.json(res.body)
})



exports.createTask = catchAsync(async (req,res,next)=>{

const {user: creator} = req
const { spaceId } = req.params
const payload = {...req.body, creator, spaceId}

res.body = await workSpaceService.createTask(payload)
res.json(res.body)
})

exports.deleteTask = catchAsync(async (req,res,next)=>{

const {user: assigner} = req
const { spaceId } = req.params
const payload = {...req.body, assigner, spaceId}

// res.body = await workSpaceService.createTask(payload)
res.json(res.body)
})

exports.updateTask = catchAsync(async (req, res, next) => {
    const { user:assigner } = req;
    const { taskId,field } = req.params;
    const payload = { ...req.body };
    res.body = await workSpaceService.updateTask(payload, assigner,field, taskId);
    res.json(res.body);
  });

  exports.getSingleTask = catchAsync(async (req,res,next)=>{
    const {user} = req;
    const {taskId} = req.params;
    const {spaceId} = req.params
    const payload = {user,taskId,spaceId}
    res.body = await workSpaceService.getSingleTask(payload)
    res.json(res.body);
  })
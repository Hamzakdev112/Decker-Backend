const workSpaceRepo = require("../repositories/workSpace");

exports.createSpace = async (payload) => {
  const space = await workSpaceRepo.createSpace({
    name: payload.name,
    creator: payload.creator,
    members: [payload.creator, payload.members],
    admins: [payload.creator, payload.admin],
    moderators: payload.moderators,
  });
  return {
    status: 200,
    success: true,
    space,
  };
};
exports.getSpaces = async (payload) => {
  const spaces = await workSpaceRepo.getSpaces({
    members: { $in: [payload.user] },
  });
  return {
    status: 200,
    success: true,
    spaces,
  };
};

exports.getSpaceById = async (payload) => {
  const space = await workSpaceRepo.getSpaceById({
    $and: [{ _id: payload.spaceId }, { creator: payload.creator }],
  });
  if (!space)
    return { status: 404, success: false, message: "space not found" };
  return {
    status: 200,
    success: true,
    space,
  };
};
exports.getTasks = async (payload) => {
  const tasks = await workSpaceRepo.getTasks({
    spaceId: payload.spaceId,
  });
  if (!tasks) return { status: 404, success: false, message: "no tasks found" };
  return {
    status: 200,
    success: true,
    tasks,
  };
};

exports.createTask = async (payload) => {
  const space = await workSpaceRepo.createTask({
    spaceId: payload.spaceId,
    name: payload.name,
    assigner: payload.creator,
    assignee: payload.assignee,
    status: payload.status,
    priority: payload.priority,
    watchers: [payload.creator, payload.watchers],
    dueDate: payload.dueDate,
  });
  return {
    success: true,
    space,
  };
};

exports.updateTask = async (payload) => {
  const task = await workSpaceRepo.getTask(payload);

  if (task.assigner.toString() !== payload.assigner.toString()) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized to update",
    };
  } else {
    const updatedTask = await task.updateOne(payload, {
      runValidators: false,
    });
    return {
      status: 200,
      success: true,
      message: "Updated successfully",
    };
  }
};
exports.deleteTask = async (payload) => {
  const task = await workSpaceRepo.getTask(payload);
  if (task.assigner.toString() !== payload.assigner.toString()) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized to delete",
    };
  } else {
    await task.deleteOne();
    return {
      status: 200,
      success: true,
      message: "Deleted successfully",
    };
  }
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

const router = require("express").Router();
const { verifyUser } = require("../middleware/auth");
const workSpaceController = require("../controllers/workSpace");

//Create a Space

router.post('/spaces/new',verifyUser, workSpaceController.createSpace)
//GET ALL WORKSPACES
router.get('/spaces/all',verifyUser, workSpaceController.getSpaces)
//Get a Space by Id
router.get('/spaces/single/:spaceId',verifyUser, workSpaceController.getSpaceById)
//Get all members of space
router.get('/spaces/members/:spaceId',verifyUser, workSpaceController.getMembers)



//Create a task
router.post('/tasks/new/:spaceId', verifyUser, workSpaceController.createTask)
//delete a task
router.delete('/tasks/delete/:taskId', verifyUser, workSpaceController.deleteTask)
// get all tasks using space id 
router.get('/tasks/all/:spaceId', verifyUser, workSpaceController.getTasks)
//update task
router.put("/tasks/update/:taskId", verifyUser, workSpaceController.updateTask);
// get single task
router.get("/tasks/singletask/:spaceId/:taskId",verifyUser,workSpaceController.getSingleTask)


//Create a task
router.post("/tasks/new/:spaceId", verifyUser, workSpaceController.createTask);
// get all tasks using space id
router.get("/tasks/all/:spaceId", verifyUser, workSpaceController.getTasks);
router.put("/tasks/update/:taskId", verifyUser, workSpaceController.updateTask);
router.get("/tasks/singletask/:spaceId/:taskId",verifyUser,workSpaceController.getSingleTask)
router.delete(
  "/tasks/delete/:taskId",
  verifyUser,
  workSpaceController.deleteTask
);

module.exports = router;

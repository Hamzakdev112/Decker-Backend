const router = require("express").Router();
const { verifyUser } = require("../middleware/auth");
const workSpaceController = require("../controllers/workSpace");

//Create a Space
router.post('/spaces/new',verifyUser, workSpaceController.createSpace)
//Search User By Email For Verification
router.get('/spaces/byemail/:email/:spaceId', workSpaceController.getUserByEmail )
//Invite Member to space
router.put('/spaces/invite/:spaceId/:userId/:userEmail',verifyUser, workSpaceController.inviteMember)
//Verify and add member
router.put('/spaces/verify/:spaceId/:token',verifyUser, workSpaceController.verifyMember)
//GET ALL WORKSPACES
router.get('/spaces/all',verifyUser, workSpaceController.getSpaces)
//Get a Space by Id
router.get('/spaces/single/:spaceId',verifyUser, workSpaceController.getSpaceById)
//Get all members of space
router.get('/spaces/members/:spaceId',verifyUser, workSpaceController.getMembers)
//Add or delete Columns
router.put('/spaces/columns/update/:column/:spaceId', verifyUser, workSpaceController.updateColumns)


//Create a task
router.post('/tasks/new/:spaceId', verifyUser, workSpaceController.createTask)
//delete a task
router.delete('/tasks/delete/:taskId', verifyUser, workSpaceController.deleteTask)
// get all tasks using space id 
router.get('/tasks/all/:spaceId', verifyUser, workSpaceController.getTasks)
//update task
router.put("/tasks/update/:field/:taskId", verifyUser, workSpaceController.updateTask);
// get single task
router.get("/tasks/singletask/:spaceId/:taskId",verifyUser,workSpaceController.getSingleTask)



module.exports = router;

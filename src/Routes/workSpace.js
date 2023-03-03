const router = require('express').Router();
const {verifyUser} = require('../middleware/auth')
const workSpaceController = require('../controllers/workSpace')


//Create a Space
router.post('/spaces/new',verifyUser, workSpaceController.createSpace)
//Create a Space
router.get('/spaces/all/:id', workSpaceController.getSpaces)
//Get a Space by Id
router.get('/spaces/single/:spaceId',verifyUser, workSpaceController.getSpaceById)



//Create a task
router.post('/tasks/new/:spaceId', verifyUser, workSpaceController.createTask)
// get all tasks using space id
router.get('/tasks/all/:spaceId', verifyUser, workSpaceController.getTasks)





module.exports = router
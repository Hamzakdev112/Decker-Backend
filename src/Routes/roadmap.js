const router = require('express').Router()
const { verifyUser } = require('../middleware/auth')
const roadmapController = require('../controllers/roadmap')

//Create a roadmap 
router.post('/roadmap/create', verifyUser, roadmapController.createRoadmap)

//Create a node 
router.post('/nodes/create/:roadmapId/:parentId', verifyUser, roadmapController.createNode)


module.exports = router

const router = require('express').Router()
const { verifyUser } = require('../middleware/auth')
const roadmapController = require('../controllers/roadmap')

//Create a Course 
router.post('/courses/create', verifyUser, roadmapController.createCourse)



module.exports = router
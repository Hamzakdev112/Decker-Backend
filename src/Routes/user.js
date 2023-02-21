const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


//Auth
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)


router.get('/all', userController.getAllUsers )




module.exports = router;
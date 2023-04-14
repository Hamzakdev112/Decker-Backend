const router = require('express').Router()
const compilerController = require('../controllers/compiler')


router.post('/compile', compilerController.compileCode)

module.exports = router
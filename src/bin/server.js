const express=require('express')
const app=express()
const port = 4500;
const cors = require('cors');

// const routes = require('./routes');
const route = require('../Routes/user')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('../bootstrap/index')
// const router=express.Router()
// const multer=require('multer')
// const userController=require('../controllers/user')
app.use(route)
app.use(cors())

//Routes
// app.post('/post',userController.createPost)

app.listen(port,()=>{

    console.log(`server listening on ${port} `)
})

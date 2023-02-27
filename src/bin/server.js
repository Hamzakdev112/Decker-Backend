//IMPORTS
const express=require('express')
const app=express()
const port = 4500;
const cors = require('cors');
require('../bootstrap/index')
const postRoute = require('../Routes/post')
const userRoute = require('../Routes/user')

const commentRoute = require('../Routes/comments')
const likeRoute = require('../Routes/likes')
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const CookieParser = require('cookie-parser');


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(CookieParser())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload ({
  useTempFiles: true
  
}))



//Routes

app.use('/api/posts', postRoute)
app.use('/api/users', userRoute)
app.use('/api/comments',commentRoute)
app.use('/api/likes',likeRoute)




//CALLING THE SERVER
app.listen(port,()=>{

    console.log(`server listening on ${port} `)
})

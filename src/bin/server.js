const express = require("express");
const app = express();
const port = 4500;
const cors = require('cors');
require('../bootstrap/index')
const postRoute = require('../Routes/post')
const userRoute = require('../Routes/user')
const chatRoute = require('../Routes/chat')
const paymentRoute = require('../Routes/payment')
var bodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const commentRoute = require('../Routes/comments')
const likeRoute = require('../Routes/likes')
var bodyParser = require('body-parser');
const session=require('express-session')


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(CookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

//Routes
app.use('/api/comments',commentRoute)
app.use('/api/likes',likeRoute)
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/chat", chatRoute);

app.listen(port, () => {
  console.log(`server listening on ${port} `);
});

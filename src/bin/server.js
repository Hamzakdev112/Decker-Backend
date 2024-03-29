const express = require("express");
const app = express();
const port = 4500;
const cors = require('cors');
require('../bootstrap/index')
var bodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session=require('express-session')
const userRoute = require('../Routes/user')
const chatRoute = require('../Routes/chat')
const workSpaceRoute = require('../Routes/workSpace')
const roadmapRoute = require('../Routes/roadmap')
const compilerRoute = require('../Routes/compiler');
const path = require("path");
const dotenv = require('dotenv')
dotenv.config({path:'../../'})
console.log(dotenv)
//MIDDLEWARES
app.use(express.json())



app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}))

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

app.use(express.static(path.join(__dirname, '..', 'build')))
//Routes
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/workspace", workSpaceRoute);
app.use("/api/roadmap", roadmapRoute);
app.use("/api/compiler", compilerRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
app.listen(port, () => {
  console.log(`server listening on ${port} `);
});

const express=require('express')
const routes=require('./Routes')
const app=express()
app.use(express.json())
app.use('/', routes);
const routes = require('./Routes');



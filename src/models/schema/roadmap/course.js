const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please enter course title']
    },
    description:{
        type:String,
        required:[true, 'Please enter course description']
    },
})

module.exports = mongoose.model('Course',courseSchema)
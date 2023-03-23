const mongoose = require('mongoose')


const roadmapSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:[true, 'Please enter course title']
    },
    description:{
        type:String,
        required:[true, 'Please enter course description']
    },
})

module.exports = mongoose.model('Roadmap',roadmapSchema)
const mongoose = require('mongoose')


const nodeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please enter course title']
    },
    description:{
        type:String,
        required:[true, 'Please enter course description']
    },
    roadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Roadmap'
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Node'
    },
})

module.exports = mongoose.model('Node',nodeSchema)

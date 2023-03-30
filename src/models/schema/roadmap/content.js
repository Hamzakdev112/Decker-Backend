const mongoose = require('mongoose')

const nodeSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true, 'Please enter course content']
    },
    roadmapId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Roadmap'
    },
    nodeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Node'
    },
})

module.exports = mongoose.model('Content',nodeSchema)

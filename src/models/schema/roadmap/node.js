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
    mainParent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Node'
    },
})

module.exports = mongoose.model('Node',nodeSchema)

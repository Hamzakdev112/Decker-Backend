const mongoose = require('mongoose');
const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter your workspace name"],
        minLength:5,
        unique:true
    },
    description: {
        type: String,
        required:[true, 'please enter description'],
        minLength:20
    },
    columns:{
        type:Array,
        default: ['name', 'dueDate', 'priority', 'assignee', 'status', 'timer']
        

    },
    creator: {
        type: String,
        required:true,
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    admins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: [true, "there must be atleast 1 admin"]
    },
    
},{
    timestamps:true
});

module.exports = new mongoose.model('Space', spaceSchema);
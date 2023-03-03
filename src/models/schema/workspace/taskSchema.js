const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "Please enter your workspace id"]
    },
    name: {
        type: String,
        required:[true, "Please enter your workspace name"]
    },
    description: {
        type: String,
    },
    attachments: {
        type:Array,

    },
    status: {
        type: String,
        required:true
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        
    },
    assigner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:[true, 'must have an assigner'],
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:[true, 'must have an assignee'],
    },
    watchers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        required:[true, 'must have an assignee'],
    },
},{
    timestamps:true
});

module.exports = new mongoose.model('Tasks', taskSchema);
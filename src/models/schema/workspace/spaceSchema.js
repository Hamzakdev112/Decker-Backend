const mongoose = require('mongoose');
const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter your workspace name"],
        unique:true
    },
    description: {
        type: String,
    },
    columns:{
        type:[Object],
        default:[
            { field: "name", headerName: "Name"},
            { "field": "assignee", "headerName": "Assignee", "width": 150 },
            { "field": "dueDate", "headerName": "Due Date", "width": 150 },
            { "field": "priority", "headerName": "Priority", "width": 150 },
            { "field": "status", "headerName": "Status", "width": 150 },
        ]
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
    moderators: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    
},{
    timestamps:true
});

module.exports = new mongoose.model('Spaces', spaceSchema);
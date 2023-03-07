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
        name:{type:Boolean ,default:true},
        dueDate:{type:Boolean ,default:true},
        priority:{type:Boolean ,default:true},
        name:{type:Boolean },
        name:{type:Boolean ,default:true},

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

module.exports = new mongoose.model('Spaces', spaceSchema);
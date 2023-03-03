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
    creator: {
        type: String,
        required:true,
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
    },
    admins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        required: [true, "there must be atleast 1 admin"]
    },
    moderators: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
    },
    
},{
    timestamps:true
});

module.exports = new mongoose.model('Spaces', spaceSchema);
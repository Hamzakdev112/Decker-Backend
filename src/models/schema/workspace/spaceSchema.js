const mongoose = require('mongoose');
const crypto = require('crypto')

const InvitationSchema = new mongoose.Schema({
    token:String,
    userId:mongoose.Types.ObjectId
})


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
        default: ['name', 'dueDate', 'priority', 'assignee', 'status', 'timer'],
    },
    statuses:{
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: mongoose.Types.ObjectId,
              },
            title: String,
            color: String,
          }],
          default:[
            {title:"IN PROGRESS", color:'red'},
            {title:"FREEZE", color:'#0861cf'},
            {title:"COMPLETED", color:'green'},
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
    invites:[InvitationSchema]
    
},{
    timestamps:true
});


spaceSchema.methods.generateInviteToken = function(userId){
    const inviteLink = crypto.randomBytes(20).toString('hex')
    const inviteToken = crypto.createHash('sha256').update(inviteLink).digest('hex')
    this.invites?.push({token:inviteToken, userId}) 
    return inviteLink

}


module.exports = new mongoose.model('Space', spaceSchema);
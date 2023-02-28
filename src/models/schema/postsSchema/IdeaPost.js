const mongoose=require('mongoose');


const ideaSchema =new mongoose.Schema({

    title: {
        type:String,
        required: [true, "Please enter job title"]
    },
    description: {
        type:String,
        required: [true, "Please enter job description"]
    },  
    userId: {
        type:mongoose.Types.ObjectId,
        required: [true, "Please enter job userId"]
    },
    postType:{
        type:String,
        required: true
    },
    sharedBy:{
        type:mongoose.Types.ObjectId,
        required:false
    },
 
    idea: {
        type:String,
        required: [true, "Please enter your idea"]

    },
    comments:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    }
},{
    timestamps:true
} )


module.exports = mongoose.model('Idea_Posts',ideaSchema);

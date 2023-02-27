const mongoose=require('mongoose');


const jobSchema =new mongoose.Schema({

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
    salary: {
        type:Number,
        required: [true, "Please enter job salary"]

    },
    sharedBy:{
        type:mongoose.Types.ObjectId,
        required:false
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


module.exports = mongoose.model('Job_Posts',jobSchema);

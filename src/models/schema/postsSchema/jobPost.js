const mongoose=require('mongoose');


const jobSchema =new mongoose.Schema({

    title: {
        type:String,
        required: [true, "Please enter job title"]
    },
    companyName: {
        type:String,
        required: [true, "Please enter company name"]
    },
    city: {
        type:String,
        required: [true, "Please enter you city"]
    },
    salary: {
        type:Number,
        required: [true, "Please enter your salary"]
    },
    experience: {
        type:Number,
        required: [true, "Please enter required experience"]
    },
    numberOfPositions: {
        type:Number,
        required: [true, "Please enter job userId"]
    },
    jobType: {
        type:String,
        required: [true, "Please enter job type"]
    },
    jobNature: {
        type:String,
        required: [true, "Please enter job nature"]
    },
    urgentHiring: {
        type:Boolean,
        default: false
    },
    postType:{
        type:String,
        required: true
    },
    sharedBy:{
        type:mongoose.Types.ObjectId,
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

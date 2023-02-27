const mongoose=require('mongoose');


const courseSchema =new mongoose.Schema({

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
    fee: {
        type:Number,
        required: [true, "Please enter fee"]

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


module.exports = mongoose.model('Course_Posts',courseSchema);

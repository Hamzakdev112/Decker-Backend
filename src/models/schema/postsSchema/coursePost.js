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
    fee: {
        type:Number,
        required: [true, "Please enter fee"]

    },
},{
    timestamps:true
} )


module.exports = mongoose.model('Course_Posts',courseSchema);

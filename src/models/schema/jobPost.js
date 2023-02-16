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
        type:String,
        required: [true, "Please enter job userId"]
    },
    salary: {
        type:Number,
        required: [true, "Please enter job salary"]

    },
},{
    timestamps:true
} )


module.exports = mongoose.model('Job_Posts',jobSchema);

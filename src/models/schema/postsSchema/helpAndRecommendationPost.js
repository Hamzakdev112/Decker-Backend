const mongoose=require('mongoose');

const helpAndRecommendationSchema =new mongoose.Schema({

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
    help: {
        type:String,
        required: [true, "Please enter job help"]

    },
},{
    timestamps:true
} )


module.exports = mongoose.model('Help_Posts',helpAndRecommendationSchema);

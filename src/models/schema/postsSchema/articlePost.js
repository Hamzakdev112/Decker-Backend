const mongoose=require('mongoose');


const articleSchema =new mongoose.Schema({

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
    article: {
        type:String,
        required: [true, "Please enter article"]

    },
},{
    timestamps:true
} )


module.exports = mongoose.model('Article_Posts',articleSchema);

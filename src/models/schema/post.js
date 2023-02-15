const mongoose=require('mongoose');

const createPostSchema=new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    postType:{
        type:String,
        required:true
    },
    file:{
        type:Boolean,
        required:true
    }


})

const createPost=new mongoose.model('Posts',createPostSchema)

module.exports=createPost;
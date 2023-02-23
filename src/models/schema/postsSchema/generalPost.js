const mongoose=require('mongoose');


const generalSchema =new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId
    },

    article:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Article_Posts'
        }
    },
    course:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Course_Posts'
        }
    },
    help:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Help_Posts'

        }
    },
    course:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Course_Posts'
        }
    },
    idea:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Idea_Posts'
        }
    },
    job:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Job_Posts'
        }
    },
    product:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Product_Posts'
        }
    },
    service:{
        postType: String,
        postId:{
            type: mongoose.Types.ObjectId,
            ref: 'Service_Posts'
        }
    },

})


module.exports = mongoose.model('General_Posts',generalSchema);

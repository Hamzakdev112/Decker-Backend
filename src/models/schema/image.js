const mongoose=require('mongoose');

// for image upload
const imageupload = new mongoose.Schema({
    image: {
        
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            
        },
    }
})

const imageModel = new mongoose.model("ImageModel", imageupload) 
module.exports = imageModel;

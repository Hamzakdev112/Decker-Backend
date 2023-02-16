const { createProductPost, createJobPost }  = require('../repositories/post')


exports.createPost =async (postType, payload)=>{

    if(postType === "job"){
        const createPayload = {
            title: payload.title,
            description: payload.description,
            userId: payload.userId,
            salary: payload.salary
        }

      const post = await createJobPost(createPayload)
       return {
        success:true,       
        post
    }
    }
    if(postType === "product"){
        const createPayload = {
            title: payload.title,
            description: payload.description,
            userId: payload.userId,
            price: payload.price
        }
       const post = await createProductPost(createPayload)
       return {
        success:true,       
        post
    }
    }
 


   
    }



const {createProductPost,createJobPost,createCoursePost,createServicePost,createHelpPost,createArticlePost,createGeneralPost,createIdeaPost}  = require('../repositories/post')

exports.createPost =async (postType, payload)=>{
    const commonPayload ={
        userId: payload.userId,
        postType: postType,
        title:  payload.title,   
        description:  payload.description,
    }

    const values = 
        postType == "Job" ? [`salary`] :
        postType == "Service"|| "Product" ? [`price`] :
        postType == "Course" ? [`fee`] :
        postType == "Help" ? [`help`] :
        postType == "Article" ? [`article`] :
        postType == "Idea" && [`idea`] 

const dynamicPayload = {
    [postType]: values.reduce((prev, current)=>{
        prev[current] = payload[current]
        return prev
    }, {})
} 


    const createPayload = {
         ...commonPayload,
         ...dynamicPayload[postType]

         }
    const post =  await eval(`create${postType}Post`)(createPayload)
          await createGeneralPost({
        userId: payload.userId,
     [postType.toLowerCase()]:  {
         postType,
         postId: post._id
     },
    })
    return {
        success:true,       
        post
    }
 
    }



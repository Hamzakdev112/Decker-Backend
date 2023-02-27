const likesModel = require('../models/schema/like');
const commentModel = require('../models/schema/comment');
const productModel = require('../models/schema/postsSchema/productPost');
const jobModel = require('../models/schema/postsSchema/jobPost');
const courseModel = require('../models/schema/postsSchema/coursePost');
const serviceModel = require('../models/schema/postsSchema/servicePost');
const helpModel = require('../models/schema/postsSchema/helpAndRecommendationPost');
const articleModel = require('../models/schema/postsSchema/articlePost');
const generalModel = require('../models/schema/postsSchema/generalPost');
const ideaModel = require('../models/schema/postsSchema/IdeaPost');
exports.likePost=async(payload)=>{
    try{
      const post=payload.postType.toLowerCase()
      if(Object.keys(await likesModel.find({
        'postId':payload.postId,
        'author':payload.author
      })).length===0){
        likesModel.create(payload)
        
        const model=eval(`${post}Model`)
        await model.updateOne( {_id:payload.postId}, { $inc : {
          [`reacts.${payload.type}`] : 1 } });
        return "liked"
      }
      else{
        if(Object.keys(await likesModel.find({
          'postId':payload.postId,
          'author':payload.author,
          "type":payload.type
        })).length===0){
          const {type}= await likesModel.findOne({
            'postId':payload.postId,
            'author':payload.author,
          })
          await likesModel.updateOne( {'postId':payload.postId,
          'author':payload.author,},
            {
              $set: {
                "type":payload.type
              },
            })
            
            const model=eval(`${post}Model`)
            await model.updateOne( { _id: payload.postId },
              { $inc: { [`reacts.${type}`]: -1,[`reacts.${payload.type}`]: 1  }})}
        else{
          await likesModel.deleteOne({
            'postId':payload.postId,
            'author':payload.author
          })
          
          const model=eval(`${post}Model`)
          await model.updateOne( { _id: payload.postId },
            { $inc: { [`reacts.${payload.type}`]: -1 }})
          return "unliked"
        }
      }
    }
      catch(error){
        console.log(error)
      }
}

//no react->post react
//react assigned->check type if type and provided type same than remove
//react assigned->check type if type and provided type different than update type
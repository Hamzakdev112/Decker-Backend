const likesModel = require('../models/schema/like');

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
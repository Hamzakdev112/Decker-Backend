const commentModel = require('../models/schema/comment');

exports.createComment = async(payload) => {
  try{
    await commentModel.create(payload)
    const post=payload.postType.toLowerCase()
    const model=eval(`${post}Model`)
    await model.updateOne( { _id: payload.postId },{ $inc: { comments: 1 }})
    return "Comment added"
  }
  catch(error){
    console.log(error)
  }
};
exports.getComments=async (postId)=>{
  
    try {
      const comments = await commentModel.find({ postId:postId }).lean();
      const commentMap = new Map();
      comments.forEach((comment) => {
        comment.replies = [];
        commentMap.set(comment._id.toString(), comment);
      });
      const replies = await commentModel.find({ parentId: { $in: [...commentMap.keys()] } }).lean();
      replies.sort((a,b)=>a.postedDate-b.postedDate)
      replies.forEach((reply) => {
        const parentComment = commentMap.get(reply.parentId.toString());
        if (parentComment) {
          reply.replies = [];
          parentComment.replies.push(reply);
          commentMap.set(reply._id.toString(),reply)
        }
      });
      const commentArray=[]
      for(const [commentId,comment] of commentMap.entries()){
        if(!comment.parentId){
          comment.replies=comment.replies.map((reply)=>commentMap.get(reply._id.toString()))
          commentArray.push(comment)
        }
      }
      return commentArray;
    } catch (error) {
     return (error);
    }
  }
exports.deleteComment=async(payload)=>{
  let count=0
  const deleteCommentAndReplies = async (commentId) => {
    try {
      // Find the comment being deleted
      const comment = await commentModel.findById(commentId);
      let {postId,postType}=comment
      if (!comment) {
        return { success: false, message: 'Comment not found' };
      }
  
      // Delete any replies
      const replies = await commentModel.find({ parentId: commentId });
      if (replies.length > 0) {
        for (const reply of replies) {
          await deleteCommentAndReplies(reply._id);
        }
      }
  
      // Delete the comment
      await commentModel.findByIdAndDelete(commentId);
      count+=1
  
      return { success: true, message: 'Comment and replies deleted successfully',id:postId,type:postType,count:count };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error deleting comment and replies' };
    }
  };

  const {id,type,count:commentCount}=await deleteCommentAndReplies(payload)
  const model=eval(`${type.toLowerCase()}Model`)
  await model.updateOne( { _id: id },{ $inc: { comments: -commentCount }})
  return "Comment deleted"
}
exports.updateComment=async(payload)=>{
  await commentModel.updateOne( { _id: payload.id },
  {
    $set: {
      "commentText":payload.text
    },
  })
  return "Comment Updated"
}
const {createComment,getComments,deleteComment,updateComment}=require('../repositories/comment')
exports.createComment =async (payload)=>{
    const comment = await createComment(payload)
    return {
        success:true,       
        comment
    }
}
exports.getComments =async (payload)=>{
    return await getComments(payload)      
}
exports.deleteComment=async(payload)=>{
    return await deleteComment(payload)
}
exports.updateComment=async(payload)=>{
    return await updateComment(payload)
}
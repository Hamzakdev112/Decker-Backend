const userModel = require('../models/schema/user');
const generalModel = require('../models/schema/postsSchema/generalPost');

exports.createUser = (payload) => {
    return userModel.create(payload) 
  };

  
exports.loginUser =async (payload) => {
    const user = await userModel.findOne({email: payload.email}) 
    if(!user) return {success:false, message: "Wrong Credentials"}
   const Comparedpassword =  await user.passwordCompare(payload.password)
    if(!Comparedpassword) return {success:false, message: "Wrong Credentials"}
  const token = user.generateToken()
  return {token, success:true}
  };

  exports.getAllUsers = async () => {
    const usersArray = []
    const users = await userModel.find()
    usersArray.push(...users)
    const userswithPosts =  await Promise.all(
    usersArray.map(async(user)=>{
    const userWithPost = {...user._doc, post: []}
    const posts = await generalModel.find({userId: user._id})
    userWithPost.post.push(...posts.map((p)=>p._id))
    return userWithPost
        })
    )
    return userswithPosts
  }
  
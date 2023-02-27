const userModel = require("../models/schema/user");
const generalModel = require("../models/schema/postsSchema/generalPost");
const friendRequest = require("../models/schema/friendRequest");
exports.createUser = (payload) => {
  return userModel.create(payload);
};

exports.loginUser = async (payload) => {
  const user = await userModel.findOne({ email: payload.email });
  if (!user) return { success: false, message: "Wrong Credentials" };
  const Comparedpassword = await user.passwordCompare(payload.password);
  if (!Comparedpassword)
    return { success: false, message: "Wrong Credentials" };
  const token = user.generateToken();
  return { token, success: true };
};

exports.uploadImage = async (createpayload) => {
  //console.log(createpayload.image);
  return userModel.findByIdAndUpdate(createpayload.userID, {
    image: createpayload.image,
  });
};

exports.userLevel = async (id, payload) => {
  return userModel.findByIdAndUpdate(id, payload);
};

exports.getAllUsers = async () => {
  const usersArray = [];
  const users = await userModel.find();
  usersArray.push(...users);
  const userswithPosts = await Promise.all(
    usersArray.map(async (user) => {
      const userWithPost = { ...user._doc, post: [] };
      const posts = await generalModel.find({ userId: user._id });
      userWithPost.post.push(...posts.map((p) => p._id));
      return userWithPost;
    })
  );
  return userswithPosts;
};

exports.findById = async (id) => {
  return userModel.findById(id);
};
exports.findOne = async (id) => {
  return userModel.findOne({
    googleId: id,
  });
};
(exports.createGoogleUser = async (profile) => {
  const user = new userModel({
    googleId: profile.id,
    displayName: profile.displayName,
    email: profile.emails[0].value,
  });
  const newUser = await user.save();
  return newUser;
}),
  // friend request sent
  (exports.friendRequest = async (createpayload) => {
    return friendRequest.create({
      userId_sendrequest: createpayload.myId,
      userId_reciever: createpayload.userId,
    });
  });

exports.checkRequest = async (payload) => {
  return friendRequest.find({ userId_reciever: payload.Id });
};

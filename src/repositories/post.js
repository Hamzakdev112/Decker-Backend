const ProductModel = require("../models/schema/postsSchema/productPost");
const JobModel = require("../models/schema/postsSchema/jobPost");
const CourseModel = require("../models/schema/postsSchema/coursePost");
const ServiceModel = require("../models/schema/postsSchema/servicePost");
const HelpModel = require("../models/schema/postsSchema/helpAndRecommendationPost");
const ArticleModel = require("../models/schema/postsSchema/articlePost");
const IdeaModel = require("../models/schema/postsSchema/ideaPost");
const GeneralModel = require("../models/schema/postsSchema/generalPost");

exports.createGeneralPost = (payload) => {
  return GeneralModel.create(payload);
};

exports.createPost = (payload, postType) => {
  return eval(`${postType}Model`).create(payload);
};


exports.sharePost = async (payload) => {
  const post = payload.postType.toLowerCase();
  const model = eval(`${post}Model`);
  const { _doc } = await model.findOne({ _id: payload.postId });
  const sharedPost = { ..._doc };
  sharedPost.sharedBy = payload.userId.toString();
  delete sharedPost._id;
  const result = await model.create(sharedPost);
  const { _id } = result;
  await generalModel.create({
    sharedBy: payload.userId.toString(),
    [post]: {
      postType: payload.postType,
      postId: _id,
    },
  });
  return result;
};
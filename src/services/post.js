const {
  createPost,
  createGeneralPost,
  sharePost,
} = require("../repositories/post");

exports.createPost = async (postType, payload) => {
  const commonPayload = {
    title: payload.title,
    userId: payload.userId,
    postType: postType,
  };

  let values = [];
  postType == "Job" && values.push("companyName", "city", "salary", "experience", "numberOfPositions", "jobType", "jobNature", "urgentHiring");
  postType == "Service" && values.push("price");
  postType == "Product" && values.push("price");
  postType == "Course" && values.push("fee");
  postType == "Help" && values.push("help");
  postType == "Article" && values.push("article");
  postType == "Idea" && values.push("idea");

  const dynamicPayload = {
    [postType]: values.reduce((prev, current) => {
      prev[current] = payload[current];
      return prev;
    }, {}),
  };

  const createPayload = {
    ...commonPayload,
    ...dynamicPayload[postType],
  };
  const post = await createPost(createPayload, postType);
  await createGeneralPost({
    userId: payload.userId,
    [postType.toLowerCase()]: {
      postType,
      postId: post._id,
    },
  });
  return {
    success: true,
    post,
  };
};

exports.sharePost = async (payload) => {
  return await sharePost(payload);
};

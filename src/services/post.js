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
  postType == "Product" && values.push("price","description","image");
  postType == "Course" && values.push("fee","description","image","video");
  postType == "Help" && values.push("description","image");
  postType == "Article" && values.push("description","image");
  postType == "Idea" && values.push("description","idea","budget");
  postType == "Project" && values.push("description","skills","paymentMethod","MinRange","MaxRange","deadline","Currency")

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

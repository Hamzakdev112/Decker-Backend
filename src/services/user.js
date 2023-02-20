const postRepo = require("../repositories/post");
const userRepo = require("../repositories/user");
const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
// joi
const joi = require("../validations/joi");
const joiSchema = require("../validations/schema/post");

// create user
exports.createUser = async (payload) => {
  //  joi.validate(payload, joiSchema.post);
  //   const passwordHash = await bcrypt.hash(payload.password, bcryptSalt);
  let user;
  const createPayload = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    gender: payload.gender,
    password: payload.password,
    phone: payload.phone,
    image: payload.image,
  };
  user = await userRepo.create(createPayload);
  return {
    id: user._id,
    success: true,
  };
};

//login user
exports.loginUser = async (payload) => {
  let user;
  // let expiresIn = '99y';
  if (payload.fromPortal) {
    user = await userRepo.findByEmail(payload.email);
    errorMessage = "error";
    //   expiresIn = '1d';
  } else {
    user = await userRepo.findByPassword(payload.password);
  }
  if (!user) {
    throw "user not found";
  }
  const token = jwt.sign({ id: user._id }, "avc");

  // console.log(token);
  return token;
};

// create post
exports.createPost = async (payload) => {
  //  joi.validate(payload, joiSchema.post);
  const createPayload = {
    user: payload.user,
    postType: payload.postType,
    file: payload.file,
  };
  await postRepo.create(createPayload);
  return {
    success: true,
  };
};
exports.uploadImage = async (payload) => {
  const createpayload = {
    userID: payload.userId,
    image: payload.file,
  };

  await userRepo.UploadImage(createpayload);

  return {
    success: true,
  };
};

// exports.userLevel = async (userType, payload) => {
//   const learnerPayload = {
//     education: payload.education,
//     domain: payload.domain,
//     scope: payload.scope,
//   };
//   const interPayload = {
//     education: payload.education,
//     jobStatus: payload.jobStatus,
//     futureInterest: payload.futureInterest,
//   };
//   const enterprisePayload = {

//     education: payload.education,
//     enterpriseName: payload.enterpriseName,
//     enterpriseSize: payload.enterpriseSize,
//   };
//   const startupPayload = {
//     education: payload.education,
//     startupName: payload.startupName,
//     startupSize: payload.startupSize,
//   };
//   switch (userType) {
//     case "learner":
//       user = await userRepo.userLevel(payload.userId, learnerPayload);
//       break;
//     case "intermediate":
//       user = await userRepo.userLevel(payload.userId, interPayload);
//       break;
//     case "professional":
//       if (payload.professionalType === "enterpise") {
//         user = await userRepo.userLevel(payload.userId, enterprisePayload);
//       }
//       if (payload.professionalType === "startup") {
//         user = await userRepo.userLevel(payload.userId, startupPayload);
//       }
//       break;
//   }

//   return {
//     success: true,
//   };
// };
exports.userLevel = async (userType, payload) => {
  const payloads = {
    userType:userType,
    learner: {
      education: payload.education,
      domain: payload.domain,
      scope: payload.scope,
    },
    intermediate: {
      education: payload.education,
      jobStatus: payload.jobStatus,
      futureInterest: payload.futureInterest,
    },
    professional: {
      enterpise: {
        education: payload.education,
        enterpriseName: payload.enterpriseName,
        enterpriseSize: payload.enterpriseSize,
      },
      startup: {
        education: payload.education,
        startupName: payload.startupName,
        startupSize: payload.startupSize,
      },
    },
  };

  const userPayload = payloads[userType];
  if (!userPayload) {
    throw new Error(`Invalid userType: ${userType}`);
  }

  if (userType === "professional") {
    if (payload.professionalType === "enterpise") {
      user = await userRepo.userLevel(payload.userId, userPayload.enterpise);
    } else if (payload.professionalType === "startup") {
      user = await userRepo.userLevel(payload.userId, userPayload.startup);
    } else {
      throw new Error(`Invalid professionalType: ${payload.professionalType}`);
    }
  } else {
    user = await userRepo.userLevel(payload.userId, userPayload);
  }

  return {
    success: true,
  };
};

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

/* exports.uploadImage = async (payload) => {
  const result = await cloudinary.uploader.upload(payload.tempFilePath  ,  {
      public_id: payload.public,
      resource_type:  payload.resourceType,
      folder: 'images'
  }) 
  const createPayload = ({
    image : {
        public_id: result.public_id,
        url: result.url
    }
});
  await userRepo.uploadImage(createPayload);
} */

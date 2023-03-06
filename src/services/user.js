const {
  createUser,
  generateOtp,
  getOtp,
  findUserById,
  loginUser,
  getAllUsers,
  uploadImage,
  userLevel,
  findById,
  friendRequest,
  checkRequest,
  getMe
} = require("../repositories/user");
const client = require('twilio')('ACffd087b5f8b99d726a821d0987dfcc73', 'b3ec0e668ca185c9ced87acf1b4aa50a')

exports.createUser = async (payload) => {
  const createPayload = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    gender: payload.gender,
    phone: payload.phone,
    password: payload.password,
  };


  const user = await createUser(createPayload);
  client.messages.create({
    from: '+12764962664',
    to: `${payload.phone}`,
    body: `Your OTP is ${payload.otp}`
  }).then((message)=>console.log(message))
  return {
    success: true,
    user,
  };
};

exports.generateOtp = async (payload)=>{
  const otp = await generateOtp({
    otp: payload.otp,
    user:payload.user
  })
}

exports.verifyOtp = async (payload)=>{
  const user = await findUserById(payload.user)
  const otp = await getOtp(payload.user)
  if(otp.otp !== payload.otp){
    await otp.updateOne({
      $inc :{retries: -1}
    })
    if(otp.retries === 0){
      await otp.deleteOne()
      return {success:false, message: "regenerate otp"}
    }

    return {success:false, message:'wrong otp'}
  } 

  user.updateOne({
    verified: true
  },{
    runValidators:false
  })
  await otp.deleteOne()

  return {
    success:true,
    message: `${user.firstName}! You're a verified user now`
  }


}


exports.loginUser = async (payload) => {
  const createPayload = {
    email: payload.email,
    password: payload.password,
  };

  const user = await loginUser(createPayload);
  return {
    user,
  };
};

exports.uploadImage = async (payload) => {
  const createpayload = {
    userID: payload.userId,
    image: payload.file,
  };

  await uploadImage(createpayload);

  return {
    success: true,
  };
};

exports.userLevel = async (userType, payload) => {
  const payloads = {
    learner: {
      userType,
      education: payload.education,
      domain: payload.domain,
      scope: payload.scope,
    },
    intermediate: {
      userType,
      education: payload.education,
      jobStatus: payload.jobStatus,
      futureInterest: payload.futureInterest,
    },
    professional: {
      enterprise: {
        userType,
        education: payload.education,
        enterpriseName: payload.enterpriseName,
        enterpriseSize: payload.enterpriseSize,
      },
      startup: {
        userType,
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
    if (payload.professionalType === "enterprise") {
      user = await userLevel(payload.userId, userPayload.enterprise);
    } else if (payload.professionalType === "startup") {
      user = await userLevel(payload.userId, userPayload.startup);
    } else {
      throw new Error(`Invalid professionalType: ${payload.professionalType}`);
    }
  } else {
    user = await userLevel(payload.userId, userPayload);
  }

  return {
    success: true,
  };
};

exports.getAllUsers = async () => {
  const users = await getAllUsers();
  return {
    users,
  };
};

exports.getMe = async (payload) => {
  const  userDetails = await getMe(payload.user);
  if(!userDetails)return {success:false, status:400, message:'error occured'}
  const {password, ...user} = userDetails._doc
  return {
    success:true,
    status:200,
    user,
  };
};

exports.updatePassword = async (payload) => {
  const user = await findById(payload.userId);
  const passwordMatch = user.passwordCompare(payload.oldPassword);
  if (!passwordMatch) {
    return {
      message: "Invalid credentials",
      success: false,
    };
  }
  user.password = payload.newPassword;
  await user.save();
  return {
    success: true,
    message: "Password changed successfully",
  };
};

exports.friendRequest = async (payload) => {
  const createpayload = {
    myId: payload.myId,
    userId: payload.userId,
  };
  const data = await friendRequest(createpayload);
  return data;
};
exports.checkRequest = async (payload) => {
  const data = await checkRequest(payload);
  return data;
};

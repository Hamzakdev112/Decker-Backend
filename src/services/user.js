const { createUser, loginUser, getAllUsers, uploadImage, userLevel }  = require('../repositories/user')

exports.createUser =async (payload)=>{

    const createPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      gender: payload.gender,
      phone: payload.phone,
      password: payload.password
      
    }
      const user = await createUser(createPayload)
       return {
        success:true,       
        user
    }
  }

  exports.loginUser = async (payload)=>{


    const createPayload ={
      email: payload.email,
      password: payload.password
    }

    const user = await loginUser(createPayload)
    return {
      user
  }


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


  exports.getAllUsers = async ()=>{
    const users = await getAllUsers()
    return {
      users
    }
  }


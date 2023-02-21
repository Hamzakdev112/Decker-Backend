const { createUser, loginUser, getAllUsers }  = require('../repositories/user')




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

  }


  exports.getAllUsers = async ()=>{
    const users = await getAllUsers()
    return {
      users
    }
  }


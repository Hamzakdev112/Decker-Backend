const userModel=require('../models/schema/user')
const imageModel=require('../models/schema/image')


exports.create=async(payload)=>{
    return userModel.create(payload)
    
}


exports.findByEmail = async (email) => {
    return userModel
      .findOne({
        email,
      })
      .lean();
  };

  exports.findByPassword = async (password) => {
    return userModel
      .findOne({
        password,
      })
      .lean();
  };

exports.UploadImage = async(createpayload) => {
  //console.log(createpayload.image);
  return userModel.findByIdAndUpdate(createpayload.userID, {
    image:  createpayload.image
    
  }

)}
exports.userLevel = async (id,payload) =>{
  return userModel.findByIdAndUpdate(id,payload)
}

/* exports.uploadImage= async (createPayload) => {
  const results = await imageModel.create(createPayload);

} */

/* exports.save = async (createPayload) => {
  const imageBio = new imageModel({
    image : {
        public_id: result.public_id,
        url: result.url
    }
}); 
const results = await imageBio.save();
}
return uimodel.save() */
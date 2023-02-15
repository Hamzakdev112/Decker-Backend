const mongoose=require('mongoose');
const config=require('../config/config')
const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose
    .connect(config.MONGODB_URL)
    .then(() => console.log('database connected'))
    .catch((err) => console.log(`database not connnected ${err}`))

}

module.exports=connect()
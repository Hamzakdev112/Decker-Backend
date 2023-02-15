
const mongoose = require('mongoose');

const createUserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        requierd: true
    },
    password: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true
    },
image:{
    type: String,
}


})

const createUser = new mongoose.model('User', createUserSchema)

module.exports = createUser;
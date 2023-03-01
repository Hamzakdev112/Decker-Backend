const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    googleAccessToken: String,
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true],
    },
    verified:{
      type:Boolean,
      default: false
    },
   
    gender: {
      type: String,
      // required: [true, "Please enter your gender"],
    },
    password: {
      type: String,
      // required: [true, "Please enter your password"],
    },
    phone: {
      type: String,
      // required: [true, "Please enter your phone"],
    },
    image: {
      type: String,
    },
    userType: {
      type: String,
    },
    education: {
      type: String,
    },
    domain: {
      type: String,
    },
    reason: {
      type: String,
    },

    jobStatus: {
      type: Boolean,
    },
    futureInterest: {
      type: String,
    },
    enterpriseName: {
      type: String,
    },
    enterpriseSize: {
      type: String,
    },
    startupName: {
      type: String,
    },
    startupSize: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//HASING PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//GENERATING AUTH TOKEN

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

//COMPARING HASHED PASSWORD

userSchema.methods.passwordCompare = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

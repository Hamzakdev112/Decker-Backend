const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controllers/user');
const {verifyUser} = require('../middleware/auth')
// const {sendOTP}=require('../controllers/firebase')
const multer = require("../middleware/multer");
const passport = require("../middleware/passport");


router.put("/sample/:userType", verifyUser, userController.userLevel);

//Auth
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logout);

//Update Profile Picture
router.put("/updateprofile/:id", multer, userController.uploadImage);

//UPDATE USER LEVEL
router.put("/level/:userType", verifyUser, userController.userLevel);


//VERIFY OTP
router.put('/verifyotp', verifyUser, userController.verifyOtp)


//GET ALL USERS
router.get('/all', userController.getAllUsers )


//GET User by email
router.get('/byemail/:email', userController.getUserByEmail )

//GET Logged IN user Details
router.get('/me',verifyUser, userController.getMe )

//Change password

router.put("/changepassword", verifyUser, userController.updatePassword);

// friend request 
router.post('/friendRequest/:id', verifyUser, userController.friendRequest)

// check friend request 
router.get('/checkrequest', verifyUser, userController.checkRequest)

//Passport authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");// right now this does not exist . Will have to enter some valid endpoint when front end is created
  }
);

router.get("/", (req, res) => {
  if (req.user) {
    res.send(`Welcome ${req.user.displayName}!`);
  } else {
    res.send("Hello world!");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const userController = require('../controllers/user');
const multer = require('../middleware/multer');
const {verifyUser} = require('../middleware/auth')
// const {sendOTP}=require('../controllers/firebase')
const userController = require("../controllers/user");
const multer = require("../middleware/multer");
const { verifyUser } = require("../middleware/auth");
const passport = require("../middleware/passport");



router.put("/sample/:userType", verifyUser, userController.userLevel);

//Auth
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

//Update Profile Picture
router.put("/updateprofile/:id", multer, userController.uploadImage);

//UPDATE USER LEVEL
router.put("/level/:userType", verifyUser, userController.userLevel);

//GET ALL USERS
router.get('/all', userController.getAllUsers )
module.exports=router
router.get("/all", userController.getAllUsers);

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
    res.redirect("/");
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

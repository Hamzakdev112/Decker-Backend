const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
const multers = require("../middleware/multer");
const loginUser = require("../middleware/loginUser");

const passport = require("../controllers/passport");

router.post("/post", loginUser, userController.createPost);

router.post("/signUp", multers, userController.createUser);

router.get("/login", userController.loginUser);

router.put("/upload/:id", multers, userController.uploadImage);

router.put("/sample/:userType", loginUser, userController.userLevel);

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

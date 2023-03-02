const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const { verifyUser } = require("../middleware/auth");
const multer = require("../middleware/multer");

//NEW POST
router.post("/new/:postType", verifyUser, multer, postController.createPost);

router.post("/share/:postType/:postId", verifyUser, postController.sharePost);

module.exports = router;

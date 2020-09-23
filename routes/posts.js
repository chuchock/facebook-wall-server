const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

// Create new post
// api/posts
router.post(
  "/",
  auth,
  [check("content", "Content is required").not().isEmpty()],
  postController.createPost
);

// Get all posts
// api/posts
router.get("/:filter", auth, postController.getPosts);

// Update post
// api/posts
router.put(
  "/:id",
  auth,
  [check("content", "Content is required").not().isEmpty()],
  postController.updatePost
);

// Delete post
// api/posts
router.delete("/:id", auth, postController.deletePost);

module.exports = router;

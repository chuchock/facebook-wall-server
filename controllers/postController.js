const Post = require("../models/Post");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create new post
    const post = new Post(req.body);

    // Save owner via JWT
    post.user = req.user.id;

    // Save post
    post.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
};

// Get all posts from user
exports.getPosts = async (req, res) => {
  try {
    console.log(req.user);
    const posts = await Post.find({ user: req.user.id }).sort({
      creationDate: -1,
    });

    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
};

// Update post
exports.updatePost = async (req, res) => {
  // Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract info from post
  const { content } = req.body;
  const newPost = {};

  if (content) {
    newPost.content = content;
  }

  try {
    // Check id
    //console.log(req.params.id);
    let post = await Post.findById(req.params.id);

    // Check if post exists or not
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check post user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Actualizar
    post = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newPost },
      { new: true }
    );

    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
};

// Delete post by id
exports.deletePost = async (req, res) => {
  try {
    // Check id
    //console.log(req.params.id);
    let post = await Post.findById(req.params.id);

    // Check if post exists or not
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check post user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete post
    await Post.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Post has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
};

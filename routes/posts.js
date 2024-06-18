const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/posts");
const { check, validationResult } = require("express-validator");

router.post(
  "/post",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: "Please enter all fields" });
    }

    try {
      const newPost = new Post({
        title: req.body.title,
        description: req.body.description
      });

      await newPost.save();
      res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

router.delete("/post/:id", auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
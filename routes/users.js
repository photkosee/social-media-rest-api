const express = require("express");
const router = express.Router();
const User = require("../models/users");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.pre("save", async function() {
  try {
    const user = await mongoose.model("User").findById(
      this.author,
      { $push: { posts: this._id } },
      { new: true }
    );
  } catch (err) {
    console.error(err);
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

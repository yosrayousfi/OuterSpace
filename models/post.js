const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Comment = require("./comment");

const roomSchema = new Schema({
  image: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", roomSchema);

module.exports = Post;

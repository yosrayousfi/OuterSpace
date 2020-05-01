const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Comment = require("./comment");

const postSchema = new Schema(
  {
    imgPath: String,
    originalname: String,
    image: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: Comment,
      },
    ],
    liked: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

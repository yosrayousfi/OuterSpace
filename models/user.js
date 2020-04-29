const mongoose = require("mongoose");
// const User = require("./user");
const Post = require("./post");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    facebookID: String,
    googleID: String,
    githubId: String,
    firstname: String,
    lastname: String,
    // bio: String,
    // dob: String,
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    profile_pic: String,
    // chat_rooms:Array,
    // notifications:Array,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

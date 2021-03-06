const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
},
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

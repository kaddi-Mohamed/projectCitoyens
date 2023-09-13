const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idea: {
    type: Schema.Types.ObjectId,
    ref: "Idea",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

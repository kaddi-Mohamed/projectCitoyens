const mongoose = require("mongoose");

const commentLikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

const CommentLike = mongoose.model("CommentLike", commentLikeSchema);

module.exports = CommentLike;

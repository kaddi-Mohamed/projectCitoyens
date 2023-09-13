const mongoose = require("mongoose");

const ideaLikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Idea",
    required: true,
  },
});

const IdeaLike = mongoose.model("IdeaLike", ideaLikeSchema);

module.exports = IdeaLike;

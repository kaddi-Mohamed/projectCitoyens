const CommentLike = require("../model/CommentLike");
const IdeaLike = require("../model/IdeaLike");
const createError = require("http-errors");

exports.checkLikeIdeaByUser = async (req, res, next) => {
  try {
    ideaId = req.params.id;
    userId = req.user._id;
    const ideaLike = await IdeaLike.find({ idea: ideaId, user: userId });
    if (!ideaLike) throw createError(404, "like not found");
    res.status(200).json(ideaLike);
  } catch (error) {
    next(error);
  }
};

exports.checkLikeCommentByUser = async (req, res, next) => {
  try {
    commentId = req.params.id;
    userId = req.user._id;
    const commentLike = await CommentLike.find({
      comment: commentId,
      user: userId,
    });
    if (!commentLike) throw createError(404, "like not found");
    res.status(200).json(commentLike);
  } catch (error) {
    next(error);
  }
};

const createHttpError = require("http-errors");
const Comment = require("../model/Comment");
const statusCodes = require("../utils/httpStatus");
const CommentLike = require("../model/CommentLike");
exports.addComment = async (req, res, next) => {
  const ideaId = req.params.id;
  const author = req.user._id;
  const text = req.body.text;
  const comment = await Comment.create({
    idea: ideaId,
    author: author,
    text: text,
  });
  res.status(200).json(comment);
};

exports.getCommentByIdea = async (req, res, next) => {
  try {
    const ideaId = req.params.id;
    const comment = await Comment.find({
      idea: ideaId,
    }).populate("author", "firstName lastName");
    if (!comment) createHttpError(statusCodes.NOT_FOUND, "comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
exports.getCommentById = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) throw createHttpError(404, "Comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const author = req.user._id;
    const text = req.body.text;
    const comment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        author: author,
      },
      {
        text: text,
      },
      {
        new: true,
      }
    );
    if (!comment)
      throw createHttpError(statusCodes.NOT_FOUND, "comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.DeleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const author = req.user._id;
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      author: author,
    });
    if (!comment)
      throw createHttpError(statusCodes.NOT_FOUND, "comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
exports.likeComment = async (req, res, next) => {
  const commentId = req.params.id;
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw createError(statusCodes.NOT_FOUND, "comment not found");
    }
    let like = await CommentLike.findOne({ user: userId, comment: commentId });
    if (!like) {
      like = new CommentLike({ user: userId, comment: commentId });
      await like.save();
      comment.likes++;
    } else {
      await CommentLike.deleteOne({ user: userId, comment: commentId });
      comment.likes--;
    }
    await comment.save();
    res
      .status(200)
      .json({ message: "Idea like updated successfully", comment });
  } catch (error) {
    next(error);
  }
};

exports.getCommentLikes = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const likesCount = comment.likes;
    return res.status(200).json({ likes: likesCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCommentCount = async (req, res, next) => {
  try {
    const count = await Comment.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

const createHttpError = require("http-errors");
const Historical = require("../model/Historical");
const statusCodes = require("../utils/httpStatus");

exports.getHistoricalByIdea = async (req, res, next) => {
  try {
    const ideaId = req.params.id;
    const historical = await Historical.find({
      idea: ideaId,
    });
    if (!historical)
      createHttpError(statusCodes.NOT_FOUND, "historical not found");
    res.status(200).json(historical);
  } catch (error) {
    next(error);
  }
};

// exports.updateComment = async (req, res, next) => {
//   try {
//     const commentId = req.params.id;
//     const author = req.user._id;
//     const text = req.body.text;
//     const comment = await Comment.findOneAndUpdate(
//       {
//         _id: commentId,
//         author: author,
//       },
//       {
//         text: text,
//       },
//       {
//         new: true,
//       }
//     );
//     if (!comment)
//       throw createHttpError(statusCodes.NOT_FOUND, "comment not found");
//     res.status(200).json(comment);
//   } catch (error) {
//     next(error);
//   }
// };

exports.DeleteHistoricalByIdea = async (req, res, next) => {
  try {
    const historicalId = req.params.id;
    const historical = await Historical.findByIdAndDelete(historicalId);
    if (!historical)
      throw createHttpError(statusCodes.NOT_FOUND, "historical not found");
    res.status(200).json(historical);
  } catch (error) {
    next(error);
  }
};

const Favorite = require("../model/Favorite");
const createHttpError = require("http-errors");
const Idea = require("../model/Idea");

exports.getFavoriteIdeaById = async (req, res, next) => {
  try {
    const user = req.user._id;
    const idea = req.params.id;
    const favorite = await Favorite.findOne({ idea: idea, user: user });
    if (!favorite) throw createHttpError(404, "idea not found in favorites");
    res.status(200).json(favorite);
  } catch (error) {
    next(error);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const ideaId = req.params.id;

    const idea = await Idea.findById(ideaId);
    if (!idea) throw createHttpError(404, "Idea not found");

    const existingFavorite = await Favorite.findOneAndDelete({
      user: userId,
      idea: ideaId,
    });

    if (existingFavorite) {
      res.status(200).json({ message: "Idea removed" });
    } else {
      await Favorite.create({ user: userId, idea: ideaId });
      res.status(200).json({ message: "idea added" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllFavoriteByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ user: userId }).populate("idea");
    if (!favorites) throw createHttpError(404, "Favorites not found");
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};
exports.removeFavoriteById = async (req, res, next) => {
  try {
    const user = req.user._id;
    const idea = req.params.id;
    const favorite = await Favorite.findOneAndDelete({
      user: user,
      idea: idea,
    });
    if (!favorite) throw createHttpError(404, "not found favorite");
    res.status(200).json(favorite);
  } catch (error) {
    next(error);
  }
};

const Idea = require("../model/Idea");
require("dotenv").config();
const config = require("config");
const IdeaLike = require("../model/IdeaLike");
const createError = require("http-errors");
const statusCodes = require("../utils/httpStatus");
const getFileNameFromURL = require("../utils/filename_fun");
const deleteImage = require("../utils/deleteImage_fun");
const Historical = require("../model/Historical");
const {
  historyMesssage,
  CreateNewDiscution,
  publicationOfIdea,
  PrivateIdea,
  createNewStatus,
} = require("../utils/historique");
exports.createIdea = async (req, res, next) => {
  let idea = await Idea.create({
    author: req.user._id,
    ...req.body,
    ideaImage: `/image/${req.file.filename}`,
  });
  res.status(201).json(idea);
};
exports.updateIdea = async (req, res, next) => {
  try {
    const {
      designation,
      smallDescription,
      longDescription,
      urlVideo,
      activitySector,
      city,
      neighborhood,
    } = req.body;

    const idea = await Idea.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
        isSend: false,
      },
      {
        designation: designation,
        smallDescription: smallDescription,
        longDescription: longDescription,
        urlVideo: urlVideo,
        activitySector: activitySector,
        city: city,
        neighborhood: neighborhood,
      }
    );
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};
exports.getIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.find({ _id: req.params.id }).populate(
      "author",
      "firstName lastName"
    );
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};
exports.deleteIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
      isSend: false,
    });
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    const filename = getFileNameFromURL(idea.ideaImage);
    deleteImage(filename, `${__dirname}/../image`);
    res.status(200).json({ message: "idea deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getUserIdea = async (req, res, next) => {
  try {
    const idea = await Idea.find({
      author: req.user._id,
    }).populate("author", "firstName lastName");
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};
exports.getUserIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.find({
      _id: req.params.id,
      author: req.user._id,
    }).populate("author", "firstName lastName");
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};
exports.sendIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { isSend: true },
      { new: true }
    );
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json({ message: idea });
  } catch (error) {
    next(error);
  }
};

exports.getSendedIdea = async (req, res, next) => {
  try {
    const idea = await Idea.find({}).populate("author", "firstName lastName");
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};
exports.getSendedIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.find({
      _id: req.params.id,
    }).populate("author", "firstName lastName");
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};
exports.updateSendedIdea = async (req, res, next) => {
  try {
    const ideaId = req.params.id;
    const idea = await Idea.findOneAndUpdate(
      { _id: ideaId, isSend: true },
      req.body,
      {
        new: true,
      }
    );
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    const { isPublic, status } = req.body;
    if (isPublic !== undefined && isPublic === true) {
      Historical.create(publicationOfIdea(ideaId));
    }
    if (isPublic !== undefined && isPublic === false) {
      Historical.create(PrivateIdea(ideaId));
    }
    if (status !== "NEW" && status !== undefined) {
      Historical.create(createNewStatus(ideaId, status));
    }
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};

exports.getPublichIdea = async (req, res, next) => {
  try {
    const idea = await Idea.find({ isPublic: true });
    if (!idea) throw createError(statusCodes.BAD_REQUEST, "not found idea");
    res.status(200).json(idea);
  } catch (error) {
    next(error);
  }
};

exports.likeIdea = async (req, res, next) => {
  const ideaId = req.params.id;
  const userId = req.user._id;
  try {
    const idea = await Idea.findById(ideaId);

    if (!idea) {
      throw createError(statusCodes.NOT_FOUND, "idea not found");
    }
    let like = await IdeaLike.findOne({ user: userId, idea: ideaId });
    if (!like) {
      like = new IdeaLike({ user: userId, idea: ideaId });
      await like.save();
      idea.like++;
    } else {
      await IdeaLike.deleteOne({ user: userId, idea: ideaId });
      idea.like--;
    }
    await idea.save();
    res.status(200).json({ message: "Idea like updated successfully", idea });
  } catch (error) {
    next(error);
  }
};

exports.getIdeaCount = async (req, res, next) => {
  try {
    const count = await Idea.find().count();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

exports.getIdeaCountByStatus = async (req, res, next) => {
  try {
    const status = req.query.status;
    const count = await Idea.find({ status: status }).count();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

exports.getMostLikedIdea = async (req, res, next) => {
  try {
    const mostLikedIdea = await Idea.findOne({}).sort({ like: -1 }).limit(1);
    if (!mostLikedIdea) {
      throw createError(statusCodes.NOT_FOUND, "not idea found");
    }
    return res.status(200).json(mostLikedIdea);
  } catch (error) {
    next(error);
  }
};
exports.addUrlDiscutionToIdea = async (req, res, next) => {
  try {
    const ideaId = req.params.id;
    const { urlDiscution, dateDiscution } = req.body;
    console.log(req.body);
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      throw createError(statusCodes.NOT_FOUND, "Idea not found");
    }
    Historical.create(CreateNewDiscution(ideaId, urlDiscution, dateDiscution));
    idea.urlDiscution = urlDiscution;
    await idea.save();
    res
      .status(200)
      .json({ message: "urlDiscution added to Idea successfully", idea });
  } catch (err) {
    next(err);
  }
};

exports.updateIdeaImage = async (req, res, next) => {
  try {
    const idea = await Idea.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
        isSend: false,
      },
      {
        ideaImage: `/image/${req.file.filename}`,
      }
    );
    if (!idea) throw createError(404, "Idea not found");
    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    next(error);
  }
};

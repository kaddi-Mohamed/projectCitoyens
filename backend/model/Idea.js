const mongoose = require("mongoose");
const ideaSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  smallDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  activitySector: {
    type: String,
  },
  city: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  datePublication: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isSend: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["NEW", "PENDING", "IN PROGRESS", "REALIZED"],
    default: "NEW",
  },
  ideaImage: { type: String },
  urlVideo: {
    type: String,
  },
  urlDiscution: {
    type: String,
    default: "",
  },
  like: {
    type: Number,
    default: 0,
  },
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;

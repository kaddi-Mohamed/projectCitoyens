const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historicalSchema = new Schema({
  idea: {
    type: Schema.Types.ObjectId,
    ref: "Idea",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const Historical = mongoose.model("Historical", historicalSchema);

module.exports = Historical;

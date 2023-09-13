const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expireIn: {
    type: Date,
    default: Date.now() + 4 * 60 * 1000,
  },
});
const Token = mongoose.model("token", tokenSchema);

module.exports = Token;

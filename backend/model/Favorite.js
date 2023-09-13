const { default: mongoose } = require("mongoose");

const favoriteSchema = mongoose.Schema({
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

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;

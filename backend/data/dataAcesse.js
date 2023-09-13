const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");
const uri = config.get("db_uri");
function getConnetion() {
  mongoose
    .connect(
      "mongodb://" + config.get("db.host") + "/" + config.get("db.name"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
}

module.exports = {
  getConnection: getConnetion,
};

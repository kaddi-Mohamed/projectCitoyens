const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 25,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  roles: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  telephone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    maxlength: 30,
  },
  address: {
    type: String,
    maxlength: 60,
  },
  status: {
    type: String,
    enum: ["ONLINE", "OFLINE"],
  },
  gcu: {
    type: Boolean,
    default: "false",
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, roles: this.roles },
    config.get("jwtPrivateKey"),
    { expiresIn: "1d" }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;

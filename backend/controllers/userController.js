const User = require("../model/User");
const crypto = require("crypto");
require("dotenv").config();
const config = require("config");
const bcrypt = require("bcrypt");
const Token = require("../model/Token");
const sendEmail = require("../utils/email");
const statusCodes = require("../utils/httpStatus");
const Idea = require("../model/Idea");
const createError = require("http-errors");
exports.createUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      throw createError(statusCodes.BAD_REQUEST, "this user already registred");
    const salt = await bcrypt.genSalt(10);
    const hashcode = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashcode;
    user = await User.create(req.body);
    let token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    token = `${config.get("baseUrl")}/user/verify/${user._id}/${token.token}`;
    await sendEmail(
      user.email,
      "Verify Email",
      token,
      `${__dirname}/../views/email_template.ejs`
    );
    res.status(200).json({
      message: "An Email send to your account please verify",
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users) throw createError(statusCodes.BAD_REQUEST, "user not found");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw createError(statusCodes.BAD_REQUEST, "user not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.bloquerUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      verified: false,
    });
    if (!user) throw createError(statusCodes.BAD_REQUEST, "user not found");
    req.status(200).json({ message: "user bloquer" });
  } catch (error) {
    next(error);
  }
};
exports.currentUser = async function (req, res, next) {
  const id = req.user._id;
  const user = await User.findById(id, "-password -gcu");
  res.status(200).json(user);
};

exports.verifyToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw createError(statusCodes.BAD_REQUEST, "Invalid link");
    let token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) throw createError(statusCodes.BAD_REQUEST, "Invalid link");
    await User.updateOne({ _id: user._id }, { verified: true });
    await Token.deleteOne({
      userId: token.userId,
      token: token.token,
    });
    res.render("email-verify");
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...req.body },
      { new: true },
      "-password -verified"
    );
    if (!user) throw createError(statusCodes.BAD_REQUEST, "user not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) throw createError(statusCodes.BAD_REQUEST, "user dosn't exist");
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};
exports.getUserCount = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};
exports.getUserCountByVerifyEmail = async (req, res, next) => {
  try {
    const verified = req.query.verified;
    const count = await User.find({ verified: verified }).count();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

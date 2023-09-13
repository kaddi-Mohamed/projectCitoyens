//get forgot password view
const User = require("../model/User");
require("config");
require("dotenv").config();
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const sendEmail = require("../utils/email");
const Token = require("../model/Token");
const statusCodes = require("../utils/httpStatus");
const createError = require("http-errors");
// email sended from the form forgot passord
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(statusCodes.NOT_FOUND, "user not found");
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: uniqid.time(),
        expireIn: Date.now() + 4 * 60 * 1000,
      });
    }
    await sendEmail(
      user.email,
      "Verify Email",
      token.token,
      `${__dirname}/../views/email-reset-password.ejs`
    );
    res.status(200).json({
      message: "An Email send to your account please verify",
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const token = await Token.findOne({
      token: req.body.token,
      expireIn: { $gt: Date.now() },
    });
    if (!token)
      throw createError(statusCodes.BAD_REQUEST, "Invalid or expired token");
    const salt = await bcrypt.genSalt(10);
    const hashcode = await bcrypt.hash(req.body.password, salt);

    const user = await User.findOneAndUpdate(
      { _id: token.userId },
      { password: hashcode }
    );
    if (!user)
      throw createError(statusCodes.BAD_REQUEST, "Invalid or expired token");
    await Token.deleteOne({ _id: token._id, userId: token.userId });
    res.status(200).json({ message: "password reset successfully " });
  } catch (error) {
    next(error);
  }
};

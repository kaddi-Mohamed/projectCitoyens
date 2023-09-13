const bcrypt = require("bcrypt");
const User = require("../model/User");
const createError = require("http-errors");

exports.authUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw createError(400, "Invalid email or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) throw createError(400, "Invalide email or password");
    if (!user.verified)
      throw createError(400, "you should verify your email first");
    const token = user.generateAuthToken();
    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
};

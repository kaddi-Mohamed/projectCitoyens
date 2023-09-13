const User = require("../model/User");
const admin = async (req, res, next) => {
  const { roles } = req.user;
  if (roles !== "ADMIN")
    return res.status(400).json({ error: "Access denied" });
  next();
};
module.exports = admin;

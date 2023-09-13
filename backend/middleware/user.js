const User = require("../model/User");
const user = async (req, res, next) => {
  const { roles } = req.user;
  if (roles !== "USER") return res.status(400).json({ error: "Access denied" });
  next();
};
module.exports = user;

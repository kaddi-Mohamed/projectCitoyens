const Joi = require("joi");
const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).max(255).required(),
});
module.exports = loginSchema;

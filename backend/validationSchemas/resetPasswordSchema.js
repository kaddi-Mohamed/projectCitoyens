const Joi = require("joi");
const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
module.exports = resetPasswordSchema;

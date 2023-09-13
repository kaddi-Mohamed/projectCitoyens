const Joi = require("joi");
const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(1024).required(),
  telephone: Joi.string()
    .pattern(/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/)
    .message("invalid phone number")
    .required(),
  roles: Joi.string().valid("ADMIN", "USER"),
  verified: Joi.boolean(),
  gcu: Joi.boolean(),
  city: Joi.string(),
  address: Joi.string(),
});
module.exports = userSchema;

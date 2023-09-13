const Joi = require("joi");
const ideaSchema = Joi.object({
  designation: Joi.string().required(),
  smallDescription: Joi.string().required(),
  longDescription: Joi.string().required(),
  city: Joi.string().required(),
  neighborhood: Joi.string().required(),
  isPublic: Joi.boolean(),
  isSend: Joi.boolean(),
  status: Joi.string().valid("NEW", "PENDING", "PROGRESS", "IN PROGRESS"),
  activitySector: Joi.string().required(),
  urlVideo: Joi.string(),
  verified: Joi.boolean(),
});
module.exports = ideaSchema;

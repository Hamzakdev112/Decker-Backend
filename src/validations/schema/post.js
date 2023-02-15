const Joi = require('joi');

exports.post = Joi.object({
  userId: Joi.string().optional(),
  postType: Joi.string().optional(),
  file: Joi.boolean().optional(),
});
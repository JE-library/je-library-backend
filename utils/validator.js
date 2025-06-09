const joi = require("joi");

const addBookSchema = joi.object({
  genre: joi.string().required(),
  title: joi.string().required(),
  author: joi.string().required(),
  year: joi.required(),
  description: joi.string().required(),
  image: joi.string().optional(),
});



module.exports = addBookSchema;

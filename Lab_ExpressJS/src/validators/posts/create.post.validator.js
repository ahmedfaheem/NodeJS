const Joi = require("joi");
 
const createPostSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(10)
        .required(),

    body: Joi.string()
        .required(),

    userId: Joi.string()
        .length(24)
        .hex()
        .required()
}).unknown(false);


module.exports = {
    body: createPostSchema
}
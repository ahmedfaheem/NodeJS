const Joi = require("joi");
 
const UpdatePostSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(10)
        .required(),

    body: Joi.string()
        .required(),
}).unknown(false);


const paramsSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
            "string.length": "ID must be 24 characters long",
            "string.hex": "ID must be a valid hex string",
    })
}).unknown(false);


module.exports = {
    body: UpdatePostSchema,
    paeams: paramsSchema
}
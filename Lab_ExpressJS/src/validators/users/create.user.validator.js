const Joi = require("joi");

const createUserSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    birthDate:Joi.date().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).required().messages({
        "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    }),
    role: Joi.string()
        .valid("admin", "user")
        .default("user").messages({
            "any.only": "must be admin or user only"
        }) 
}).unknown(false);


module.exports = {
    body:createUserSchema,
}
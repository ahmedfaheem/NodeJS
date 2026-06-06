// const createUserSchema = require("../validators/users/create.user.validator");

const APIError = require("../utils/APIError");

// const validateUser = (req, res, next)=>{
//     const {error} = createUserSchema.validate(req.body);
//     if(error){
//         return res.status(400).json({
//          message: error.details[0].message
//         })
//     }

//     next();
// }


const validate = (schema)=>{
      return async (req, res, next)=>{
        try{
        for(const key in schema){
            const value = await schema[key].validateAsync(req[key]);
            req[key] = value;
        }
        next();
    }catch(error){
        throw new APIError(error.details[0].message, 400);
    }
      }
}

module.exports = validate;
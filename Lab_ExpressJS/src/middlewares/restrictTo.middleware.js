const APIError = require("../utils/APIError");

const restrictTo =  (role)=>{
    return  (req, res, next)=>{
    if(req.user.role != role){
          throw new APIError("Forbidden", 403)

    }
    
            next();

    }
}


module.exports = restrictTo;
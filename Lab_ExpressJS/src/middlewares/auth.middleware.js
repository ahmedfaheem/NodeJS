const jwt = require("jsonwebtoken");
const APIError = require("../utils/APIError")

const auth = async (req, res, next)=>{
    try{
    const headerToken = req.headers.authorization; // "Bearer <token>"
    if(!headerToken) throw new APIError("unauthrized", 401);
    const token = headerToken.split(" ")[1];
     const secretKey = process.env.JWT_SECRET;
     const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;
       next();

    }catch(error){
     throw new APIError("unauthrized", 401);

    }
}


module.exports = auth;
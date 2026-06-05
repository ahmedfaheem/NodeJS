
const relogger = (req, res, next) => {
    console.log("Relogger Middleware");
    console.log(req.method, req.url);
    
    next();
}

module.exports = relogger;
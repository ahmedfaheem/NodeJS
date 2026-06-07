module.exports = {
    auth: require("../middlewares/auth.middleware"),
    restrictTo: require("../middlewares/restrictTo.middleware"),
    validate : require("../middlewares/validate.middleware"),
}
const express = require("express");
const usersRouter = require("./routes/users.routes");
const postsRouter = require("./routes/posts.routes");
const donationRouter = require("./routes/donation.routes");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");


const app = express();

app.set("trust proxy", 1);

// middleware to parse JSON bodies, except the Kashier webhook which parses raw text
app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/donation/webhook")) {
        return next();
    }

    return express.json()(req, res, next);
});
app.use(morgan('dev')); // logger
app.use(helmet()); // sniffing to ensure data and files type in headers
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,  //15 min
    max: 50, // request
    message: "Too many requests"
}));
app.use((req, res, next) => {
    if (req.body) {
        mongoSanitize.sanitize(req.body); // clean queries 
    }
    mongoSanitize.sanitize(req.params);
    next();
});
app.use(xss()); // Cross Site Scripting (XSS) -- ex-- js code  in post body
app.use(hpp());  //  HTTP Parameter Pollution -- ?page=1&page=999 -- 1 or 99 deal with one only

// define routes

app.use("/users", usersRouter);
app.use("/posts", postsRouter); 
app.use("/donation", donationRouter);
// global error middleware
app.use(errorHandlerMiddleware)

// app.use((err, req, res, next) => {
//     console.error("❌❌ ", err);
//     res.status(500).json({ message: "something went wrong" });
// })


module.exports = app;
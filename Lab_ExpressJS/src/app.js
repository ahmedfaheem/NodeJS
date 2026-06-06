const express = require("express");
const usersRouter = require("./routes/users.routes");
const postsRouter = require("./routes/posts.routes");


const app = express();

// middleware to parse JSON bodies
app.use(express.json());


// define routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// global error middleware
// app.use((err, req, res, next) => {
//     console.error("❌❌ ", err);
//     res.status(500).json({ message: "something went wrong" });
// })


module.exports = app;
const express = require("express");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const app = express();


app.use(express.json());


// define routes
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

//global error middleware
app.use((err, req, res, next) => {
    console.error("❌❌ ", err);
    res.status(500).json({ message: "something went wrong" });
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

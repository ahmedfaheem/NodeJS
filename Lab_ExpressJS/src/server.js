
const app = require("./app");
const mongoose = require("mongoose");

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');

    mongoose.connect("mongodb://localhost:27017/Node_Lab").then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

});

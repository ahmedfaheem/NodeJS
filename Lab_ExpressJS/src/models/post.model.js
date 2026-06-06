const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { 
        type: String,
         required: true,
         trim:true,
         min:50,
        },
    body: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
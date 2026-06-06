const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { 
        type: String,
         required: true,
         trim:true,
         min:10,
        },
    body: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String,
        length:24, 
        required: true,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
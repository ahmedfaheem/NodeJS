const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
         type: String, 
         required: true ,
    }, 
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birthDate: { 
        type: Date, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["admin", "user"],
        default: "user"
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    amount: {
         type: Number, 
         required: true ,
    }, 
    status: {
         type: String, 
         enum: ["pending", "completed", "faild"],
         default: "pending"
    },
     userId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User",
         required: true ,
    },
    providerSessionID:{
        type:String
    },
    link:{
        type:String
    }

}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);
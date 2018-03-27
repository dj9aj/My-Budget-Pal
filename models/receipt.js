const mongoose = require("mongoose");

// Schema Setup
const receiptSchema = new mongoose.Schema({

    receipt_type: String,
    category: String,
    description: String,
    value: Number,
    createdAt: {
        type: Date, 
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});  

module.exports = mongoose.model("Receipt", receiptSchema);
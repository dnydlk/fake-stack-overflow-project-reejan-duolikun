const mongoose = require("mongoose");

// Schema for answers
module.exports = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            select: false,
            max: 25,
        }
    }
);

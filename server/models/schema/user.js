const mongoose = require("mongoose");
const user = require("../user");
const votes = require("../votes");

// Schema for answers
module.exports = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
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
        },
        username: {
            type: String,
            max: 25,
        },
        location: {
            type: String,
            max: 50,
            default: "Location not provided",
        },
        title: {
            type: String,
            max: 50,
            default: "Title not provided",
        },
        aboutMe: {
            type: String,
            max: 1000,
            default: "About me not provided",
        },
        link: {
            type: String,
            max: 100,
            default: "Link not provided",
        },
        askedQuestion: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        answeredQuestion: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Answer",
            },
        ],
        votedAnswer: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vote",
            },
        ],
        role: {
            type: String,
            enum: ["user", "moderator"],
            default: "user",
        },
    },
    { collection: "User" }
);

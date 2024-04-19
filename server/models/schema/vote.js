const mongoose = require("mongoose");

// Schema for votes
module.exports = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        answer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer", required: true },
        voteType: { type: Boolean, required: true },
    },
    {
        timestamps: true,
        collection: "Vote",
    }
);

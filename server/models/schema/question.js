const mongoose = require("mongoose");

// Schema for questions
module.exports = mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
        answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
        asked_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ask_date_time: { type: Date, default: Date.now },
        views: { type: Number, default: 0 },
        isFlagged: { type: Boolean, default: false },
        flaggedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { collection: "Question" }
);

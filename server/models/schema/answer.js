const mongoose = require("mongoose");

// Schema for answers
module.exports = mongoose.Schema(
    {
        text: { type: String, required: true },
        ans_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ans_date_time: { type: Date, default: Date.now },
        votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Votes" }],
    },
    { collection: "Answer" }
);

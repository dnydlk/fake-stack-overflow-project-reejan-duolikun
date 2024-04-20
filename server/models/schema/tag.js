const mongoose = require("mongoose");

// Schema for tags
module.exports = mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { collection: "Tag" }
);

const mongoose = require("mongoose");
// const question = require("./question")

// Schema for tags
module.exports = mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { collection: "Tag" }
)

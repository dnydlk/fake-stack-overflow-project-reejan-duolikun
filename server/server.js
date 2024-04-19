// Application server

// Use express to create a server
const express = require("express");
// Use mongoose to connect to MongoDB
const mongoose = require("mongoose");
// Use cors to allow cross-origin requests
const cors = require("cors");

// Import the configuration settings
const { MONGO_URL, port, CLIENT_URL } = require("./config");

// Connect to MongoDB
mongoose.connect(MONGO_URL);

const app = express();

// Allow cross-origin requests
app.use(
    cors({
        credentials: true,
        origin: [CLIENT_URL],
    })
);

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with JSON payloads
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Fake SO Server Dummy Endpoint");
    res.end();
});

// Import the controllers
const questionController = require("./controller/question");
const tagController = require("./controller/tag");
const answerController = require("./controller/answer");
const authController = require("./controller/auth.js");
const voteController = require("./controller/vote.js");

// Use the controllers
app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/user", authController);
app.use("/vote", voteController)

let server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

// Export the server for testing
module.exports = server;

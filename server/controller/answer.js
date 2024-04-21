const express = require("express");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/user");
const Vote = require("../models/votes");
const router = express.Router();

// To add Answer
const addAnswer = async (req, res) => {
    const { qid, ans } = req.body;
    // Create a new answer
    const newAnswer = await Answer.create(ans);
    // Update the question with the new answer
    await Question.findOneAndUpdate({ _id: qid }, { $push: { answers: newAnswer._id } });
    // Add the answer to the user's answeredQuestion array
    await User.findOneAndUpdate({ _id: ans.ans_by }, { $push: { answeredQuestion: newAnswer._id } });
    res.status(200).send(newAnswer);
};

// To get Answer
const getAnswerByUser = async (req, res) => {
    const { userId } = req.query;
    try {
        // Find answers where the 'ans_by' field matches the provided 'userId'
        const answers = await Answer.find({ ans_by: userId }).populate({ path: "votes", model: "Vote" });
        res.status(200).json(answers);
    } catch (error) {
        console.error("Error fetching answers: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Routers
router.get("/getAnswer", getAnswerByUser);
router.post("/addAnswer", addAnswer);

module.exports = router;

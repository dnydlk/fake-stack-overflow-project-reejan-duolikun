const express = require("express");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const router = express.Router();

// To add Answer
const addAnswer = async (req, res) => {
    const { qid, ans } = req.body;
    const newAnswer = await Answer.create(ans);
    await Question.findOneAndUpdate({ _id: qid }, { $push: { answers: newAnswer._id } });
    res.status(200).send(newAnswer);
}

// Routers
router.post("/addAnswer", addAnswer);

module.exports = router;

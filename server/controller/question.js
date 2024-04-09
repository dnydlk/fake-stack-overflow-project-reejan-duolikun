const express = require("express");
const Question = require("../models/questions");
// const Answer = require("../models/answers")
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require("../utils/question");

const router = express.Router();

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
    const { order, search } = req.query;
    const questions = await getQuestionsByOrder(order);
    const filteredQuestions = filterQuestionsBySearch(questions, search);
    res.json(filteredQuestions);
};

// To get Questions by Id
const getQuestionById = async (req, res) => {
    const { qid } = req.params;
    const question = await Question.findOneAndUpdate({ _id: qid }, { $inc: { views: 1 } }).populate("answers");
    res.json(question);
};

// To add Question
const addQuestion = async (req, res) => {
    const question = req.body;
    // add tags to the question
    question.tags = await Promise.all(question.tags.map((tagName) => addTag(tagName)));
    // create the question in the database
    const result = await Question.create(question);
    res.status(200).json(result);
};

// Routers
router.get("/getQuestion", getQuestionsByFilter);
router.get("/getQuestionById/:qid", getQuestionById);
router.post("/addQuestion", addQuestion);

module.exports = router;
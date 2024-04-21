const express = require("express");
const Question = require("../models/questions");
const User = require("../models/user");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require("../utils/question");
const { JWT_SECRET } = require("../config");
const { verify } = require("jsonwebtoken");

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
    const question = await Question.findOneAndUpdate({ _id: qid }, { $inc: { views: 1 } }, { new: true })
        .populate({
            path: "answers",
            populate: {
                path: "ans_by",
                select: "username",
            },
        })
        .populate({
            path: "asked_by",
            select: "username",
        });

    console.log("🚀 ~ getQuestionById ~ question:", question);
    res.json(question);
};

// To add Question
const addQuestion = async (req, res) => {
    const question = req.body;
    // add tags to the question
    question.tags = await Promise.all(question.tags.map((tagName) => addTag(tagName)));
    // create the question in the database
    const result = await Question.create(question);
    // update the user's askedQuestion array
    await User.findOneAndUpdate({ _id: question.asked_by }, { $push: { askedQuestion: result._id } });
    res.status(200).json(result);
};

// Check role
function checkRole(role) {
    return function (req, res, next) {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ message: "Access Denied: Insufficient permissions" });
        }
    };
}

const deleteQuestion = async (req, res) => {
    try {
        const questionToDelete = await Question.findById(req.params.qid);
        if (!questionToDelete) {
            return res.status(404).json({ message: "Question not found" });
        }
        await questionToDelete.remove();
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error(object);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.status(400).json({ error: "User not authenticated" });
    }
    try {
        const decodedToken = verify(accessToken, JWT_SECRET);
        if (decodedToken) {
            req.authenticated = true;
            req.user = decodedToken;
            console.log("🚀 ~ validateToken ~ decodedToken:", decodedToken);
            console.log("🚀 ~ validateToken: Token validated");
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

const getFlaggedQuestion = async (req, res) => {
    try {
        const questions = await Question.find({ isFlagged: true }).populate("flaggedBy");
        console.log("🚀 ~ getFlaggedQuestion ~ questions:", questions);
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const flagQuestion = async (req, res) => {
    try {
        const questionId = req.body.questionId;
        console.log("🚀 ~ flagQuestion ~ questionId:", questionId);
        const userId = req.body.userId;
        console.log("🚀 ~ flagQuestion ~ userId:", userId);

        // Check if the question is already flagged
        const question = await Question.findById(questionId);
        console.log("🚀 ~ flagQuestion ~ question:", question);
        if (question.isFlagged) {
            const updatedQuestion = await Question.findByIdAndUpdate(
                questionId,
                { $set: { isFlagged: false, flaggedBy: null } },
                { new: true }
            )
                .populate({
                    path: "answers",
                    populate: {
                        path: "ans_by",
                        select: "username",
                    },
                })
                .populate({
                    path: "asked_by",
                    select: "username",
                });
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }
            res.json({ message: "Question unflagged", question: updatedQuestion });
            return;
        } else if (!question.isFlagged) {
            const updatedQuestion = await Question.findByIdAndUpdate(
                questionId,
                { $set: { isFlagged: true, flaggedBy: userId } },
                { new: true }
            )
                .populate({
                    path: "answers",
                    populate: {
                        path: "ans_by",
                        select: "username",
                    },
                })
                .populate({
                    path: "asked_by",
                    select: "username",
                });
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question not found" });
            }
            res.json({ message: "Question flagged as inappropriate", question: updatedQuestion });
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Routers
router.get("/getQuestion", getQuestionsByFilter);
router.get("/getQuestionById/:qid", getQuestionById);
router.get("/getFlaggedQuestion/:qid", validateToken, checkRole("moderator"), getFlaggedQuestion);
router.post("/addQuestion", addQuestion);
router.delete("/deleteQuestion/:qid", validateToken, checkRole("moderator"), deleteQuestion);
router.patch("/flagQuestion", validateToken, flagQuestion);

module.exports = router;

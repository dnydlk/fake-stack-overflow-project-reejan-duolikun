const express = require("express");
const Vote = require("../models/votes");
const Answer = require("../models/answers");

const router = express.Router();

// Vote
const vote = async (req, res) => {
    const { userId, answerId, voteType } = req.body;
    try {
        // Check if the user has already voted
        const existingVote = await Vote.findOne({ user: userId, answer: answerId });

        // If the user has already voted
        if (existingVote) {
            // If the vote type is NOT the same
            if (existingVote.voteType !== voteType) {
                // Change the vote type
                existingVote.voteType = voteType;
                await existingVote.save();
                res.status(200).json({ message: "Vote updated successfully" });
            }
            // If the vote type is the SAME
            else {
                // Cancel the vote by removing it
                await Vote.deleteOne({ _id: existingVote._id });
                await Answer.findByIdAndUpdate(answerId, {
                    $pull: { votes: existingVote._id },
                });
                res.status(200).json({ message: "Vote cancelled successfully" });
            }
        }
        // If the user has NOT voted
        else {
            // Create a new vote
            const newVote = new Vote({ user: userId, answer: answerId, voteType });
            await newVote.save();
            await Answer.findByIdAndUpdate(answerId, {
                $push: { votes: newVote._id },
            });
            res.status(201).json({ message: "Vote recorded successfully" });
        }
    } catch (error) {
        console.error("Voting error:", error);
        res.status(500).json({ error: "An error occurred while processing your vote", details: error.message });
    }
};

// Fetch current vote
const fetchCurrentVote = async (req, res) => {
    const { answerId } = req.query;
    try {
        const votes = await Vote.find({ answer: answerId });
        let upvotes = 0;
        let downvotes = 0;
        votes.forEach((vote) => {
            if (vote.voteType) {
                upvotes++;
            } else {
                downvotes++;
            }
        });
        const currentVotes = upvotes - downvotes;
        res.status(200).send({ currentVotes });
    } catch (error) {
        console.error("Error fetching votes:", error);
        res.status(500).send({ error: "Failed to fetch the votes" });
    }
};

// Router
router.post("/", vote);
router.get("/current-vote", fetchCurrentVote);

module.exports = router;

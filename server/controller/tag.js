const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

// Get all tags with the number of questions associated with each tag
const getTagsWithQuestionNumber = async (req, res) => {
	try {
		// Find all tags
		const allTags = await Tag.find();
		const allQuestions = await Question.find().populate('tags');

		// Create an empty object to store tag counts
		const tagCounts = {};

		// Iterate over each tag
		for (const tag of allTags) {
			// Find questions that have this tag
			const questionsWithTag = allQuestions.filter(question => question.tags.some(t => t.name === tag.name));

			// Count the number of questions
			const questionCount = questionsWithTag.length;

			// Add the tag and its question count to the tagCounts object
			tagCounts[tag.name] = questionCount;
		}

		// Convert tagCounts object to array of objects with name and qcnt properties
		const tagsWithQuestionNumber = Object.entries(tagCounts).map(([name, qcnt]) => ({ name, qcnt }));

		// Returning the tags with question numbers
		res.json(tagsWithQuestionNumber);
	} catch (error) {
		console.error('Error retrieving tags with question numbers:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Routers
router.get("/getTagsWithQuestionNumber", getTagsWithQuestionNumber);

module.exports = router;

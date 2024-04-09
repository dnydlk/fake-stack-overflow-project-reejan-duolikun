const express = require("express")
const Tag = require("../models/tags")
const Question = require("../models/questions")

const router = express.Router()

// Get all tags with the number of questions associated with each tag
const getTagsWithQuestionNumber = async (req, res) => {
  const tags = await Tag.find()

  // Create a map to store the number of questions associated with each tag
  const tagQuestionCount = new Map()

  // Initialize the map with 0 for each tag
  tags.forEach((tag) => tagQuestionCount.set(tag._id.toString(), 0))

  // Get all questions and populate the tags field
  const questions = await Question.find().populate("tags")

  // Iterate through all questions and increment the count for each tag
  questions.forEach((question) => {
    question.tags.forEach((tag) => {
      if (tagQuestionCount.has(tag._id.toString())) {
        tagQuestionCount.set(tag._id.toString(), tagQuestionCount.get(tag._id.toString()) + 1)
      }
    })
  })

  // Create an array of tags with the count of questions associated with each tag
  const tagsWithCount = tags.map((tag) => ({
    name: tag.name,
    qcnt: tagQuestionCount.get(tag._id.toString()),
  }))

  // return the tags sorted by the number of questions associated with each tag
  res.json(tagsWithCount.sort((a, b) => b.qcnt - a.qcnt))
}

// Routers
router.get("/getTagsWithQuestionNumber", getTagsWithQuestionNumber)

module.exports = router

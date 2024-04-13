const Tag = require("../models/tags");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const { get } = require("mongoose");

const addTag = async (tagName) => {
    // check if tag already exists
    const existingTag = await Tag.findOne({ name: tagName });
    // if tag already exists, return the id of the existing tag
    if (existingTag) {
        return existingTag._id;
    }
    // if tag does not exist, create a new tag and return the id of the new tag
    else {
        const newTag = await new Tag({ name: tagName }).save();
        return newTag._id;
    }
};

const getQuestionsByOrder = async (order) => {
    order = order.toLowerCase();
    try {
        let questions = [];
        /*
        if order === "newest",
            find: all questions
            sort: sort the results in descending order
            populate: replace the specified path in the document with document(s) from other collection(s)
            exec(): execute the query
        */
        if (order === "newest") {
            questions = await getNewestQuestion();
        }
        // if order === "oldest", sort questions by ask_date_time in ascending order
        else if (order === "active") {
            questions = await getActiveQuestion();
        }
        // if order === "unanswered", only return questions that have no answers
        else if (order === "unanswered") {
            questions = await getUnansweredQuestion();
        }
        return questions;
    } catch (error) {
        console.log("Error in getQuestionsByOrder", error);
    }
};

const filterQuestionsBySearch = (qlist, search) => {
    // trim and convert search to lowercase
    search = search.trim().toLowerCase();
    // parse a string and extract all substrings that are enclosed in square brackets [] into an array
    let searchTags = parseTags(search);
    // parse a string and extract all words into an array
    let searchKeywords = parseKeyword(search);

    const result = qlist.filter((q) => {
        // if search is empty, return all questions
        if (searchKeywords.length == 0 && searchTags.length == 0) {
            return true;
        }
        // if search contains only tags
        else if (searchKeywords.length == 0) {
            return checkTagInQuestion(q, searchTags);
        }
        // if search contains only keywords
        else if (searchTags.length == 0) {
            return checkKeywordInQuestion(q, searchKeywords);
        }
        // if search contains both tags and keywords
        // return questions that have either the tag or the keyword
        else {
            return checkTagInQuestion(q, searchTags) || checkKeywordInQuestion(q, searchKeywords);
        }
    });
    return result;
};

// Get all questions sorted by newest ask_date_time
const getNewestQuestion = async () => {
    try {
        const questions = await Question.find({}).populate("tags answers").exec();
        return questions.sort((a, b) => {
            if (a.ask_date_time > b.ask_date_time) {
                return -1;
            } else if (a.ask_date_time < b.ask_date_time) {
                return 1;
            } else {
                return 0;
            }
        });
    } catch (error) {
        console.log("Error in getNewestQuestions", error);
    }
};

// Get all questions that have no answers
const getUnansweredQuestion = async () => {
    try {
        const questions = await getNewestQuestion();
        return questions.filter((q) => q.answers.length === 0);
    } catch (error) {
        console.log("Error in getUnansweredQuestion", error);
    }
};

// Get all questions sorted by newest answer date
const getActiveQuestion = async () => {
    try {
        const questions = await getNewestQuestion();
        // iterate through all questions
        for (let q of questions) {
            // iterate through all answers of each question
            for (let a of q.answers) {
                if (a != null) {
                    setNewestAnswerDate(q, a.ans_date_time);
                }
            }
        }

        // return questions sorted by new_ans_date
        return questions.sort((a, b) => {
            if (!a.new_ans_date) {
                return 1;
            } else if (!b.new_ans_date) {
                return -1;
            }
            if (a.new_ans_date > b.new_ans_date) {
                return -1;
            } else if (a.new_ans_date < b.new_ans_date) {
                return 1;
            } else {
                return 0;
            }
        });
    } catch (error) {
        console.log("Error in getActiveQuestion", error);
    }
};

// Set the newest answer date of a question
const setNewestAnswerDate = (q, ans_date_time) => {
    if (q.new_ans_date == null || q.new_ans_date < ans_date_time) {
        q.new_ans_date = ans_date_time;
    }
};

// Parse tags from search to an array
const parseTags = (searchTags) => {
    return (searchTags.match(/\[([^\]]+)\]/g) || []).map((word) => word.slice(1, -1));
};

// Parse keywords from search to an array
const parseKeyword = (searchKeywords) => {
    return searchKeywords.replace(/\[([^\]]+)\]/g, " ").match(/\b\w+\b/g) || [];
};

// Iterate through all tags in search and check if the tag is already in the question
const checkTagInQuestion = (q, tagListInSearch) => {
    for (let sTag of tagListInSearch) {
        for (let qTag of q.tags) {
            if (sTag === qTag.name) {
                return true;
            }
        }
    }
    return false;
};

// Iterate through all keywords in search and check if the keyword is in the question
const checkKeywordInQuestion = (q, searchKeywords) => {
    for (let keyword of searchKeywords) {
        if (q.title.toLowerCase().includes(keyword) || q.text.toLowerCase().includes(keyword)) {
            return true;
        }
    }
    return false;
};

module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch, getNewestQuestion, getUnansweredQuestion, getActiveQuestion, parseTags, parseKeyword, checkTagInQuestion, checkKeywordInQuestion, setNewestAnswerDate };

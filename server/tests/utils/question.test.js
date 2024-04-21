// Unit tests for utils/question.js

const mockingoose = require("mockingoose");
const Question = require("../../models/questions");
const Tag = require("../../models/tags");
const {
    addTag,
    getQuestionsByOrder,
    filterQuestionsBySearch,
    getNewestQuestion,
    getUnansweredQuestion,
    getActiveQuestion,
    parseTags,
    parseKeyword,
    checkTagInQuestion,
    checkKeywordInQuestion,
    setNewestAnswerDate,
} = require("../../utils/question");
Question.schema.path("answers", Array);

const _tag1 = {
    _id: "6616be8a82f5ce6a4788239f",
    name: "react",
};

const _tag2 = {
    _id: "6616be8a82f5ce6a4788239f",
    name: "javascript",
};

const _tag3 = {
    _id: "6616be8a82f5ce6a4788239f",
    name: "android-studio",
};

const _tag4 = {
    _id: "6616be8a82f5ce6a4788239f",
    name: "shared-preferences",
};

const _ans1 = {
    _id: "65e9b58910afe6e94fc6e6dc",
    text: "ans1",
    ans_by: "ans_by1",
    ans_date_time: new Date("2024-03-01T01:01:01"),
};

const _ans2 = {
    _id: "65e9b58910afe6e94fc6e6dd",
    text: "ans2",
    ans_by: "ans_by2",
    ans_date_time: new Date("2024-03-02T02:02:02"),
};

const _ans3 = {
    _id: "65e9b58910afe6e94fc6e6de",
    text: "ans3",
    ans_by: "ans_by3",
    ans_date_time: new Date("2024-03-03T03:03:03"),
};

const _ans4 = {
    _id: "65e9b58910afe6e94fc6e6df",
    text: "ans4",
    ans_by: "ans_by4",
    ans_date_time: new Date("2024-03-04T04:04:04"),
};

const _questions = [
    {
        _id: "65e9b58910afe6e94fc6e6dc",
        title: "Quick question about storage on android",
        text: "I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains",
        tags: [_tag3, _tag2],
        answers: [_ans1, _ans2],
        ask_date_time: new Date("2024-02-01T01:01:01"),
    },
    {
        _id: "65e9b5a995b6c7045a30d823",
        title: "Object storage for a web application",
        text: "I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.",
        tags: [_tag1, _tag2],
        answers: [_ans1, _ans2, _ans3],
        ask_date_time: new Date("2024-02-02T02:02:02"),
    },
    {
        _id: "65e9b9b44c052f0a08ecade0",
        title: "android studio save string shared preference, start activity and load the saved string",
        text: "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.",
        tags: [],
        answers: [],
        ask_date_time: new Date("2024-02-03T03:03:03"),
    },
    {
        _id: "65e9b716ff0e892116b2de09",
        title: "Programmatically navigate using React router",
        text: "the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.",
        tags: [],
        answers: [],
        ask_date_time: new Date("2024-02-04T04:04:04"),
    },
];

describe("Unit tests for utils/question.js", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    // getQuestionsByOrder
    test("getQuestionsByOrder returns questions sorted by newest", async () => {
        const questions = [
            {
                _id: "6616ba13b10a621bb4792967",
                ask_date_time: new Date("2024-04-01T01:01:01"),
            },
            {
                _id: "6616ba0ba12b58d8ec31961f",
                ask_date_time: new Date("2024-04-02T02:02:02"),
            },
            {
                _id: "6616b9fe36b5c9e8dbd0e356",
                ask_date_time: new Date("2024-04-03T03:03:03"),
            },
        ];

        mockingoose(Question).toReturn(questions, "find");

        const result = await getQuestionsByOrder("newest");

        expect(result.length).toEqual(3);
        expect(result[0]._id.toString()).toEqual("6616b9fe36b5c9e8dbd0e356");
        expect(result[1]._id.toString()).toEqual("6616ba0ba12b58d8ec31961f");
        expect(result[2]._id.toString()).toEqual("6616ba13b10a621bb4792967");
    });

    test("getQuestionsByOrder returns questions sorted by unanswered", async () => {
        mockingoose(Question).toReturn(_questions, "find");

        const result = await getQuestionsByOrder("unanswered");

        expect(result.length).toEqual(2);
        expect(result[0]._id.toString()).toEqual("65e9b716ff0e892116b2de09");
        expect(result[1]._id.toString()).toEqual("65e9b9b44c052f0a08ecade0");
    });

    test("getQuestionsByOrder returns questions sorted by active", async () => {
        mockingoose(Question).toReturn(_questions, "find");

        const result = await getQuestionsByOrder("active");

        expect(result.length).toEqual(4);
        expect(result[0]._id.toString()).toEqual("65e9b5a995b6c7045a30d823");
        expect(result[1]._id.toString()).toEqual("65e9b58910afe6e94fc6e6dc");
        expect(result[2]._id.toString()).toEqual("65e9b716ff0e892116b2de09");
        expect(result[3]._id.toString()).toEqual("65e9b9b44c052f0a08ecade0");
    });

    // filterQuestionsBySearch
    test("filterQuestionsBySearch returns 4 question objects if search is empty", () => {
        const result = filterQuestionsBySearch(_questions, "");
        expect(result.length).toEqual(4);
    });

    test("filterQuestionsBySearch returns 1 question object if search is one keyword that matches one question", () => {
        const result = filterQuestionsBySearch(_questions, "Programmatically");
        expect(result.length).toEqual(1);
        expect(result[0]._id).toEqual("65e9b716ff0e892116b2de09");
    });

    test("filterQuestionsBySearch returns 2 question objects if search is one tag that matches two questions", () => {
        const result = filterQuestionsBySearch(_questions, "[android-studio]");
        expect(result.length).toEqual(1);
        expect(result[0]._id).toEqual("65e9b58910afe6e94fc6e6dc");
    });

    test("filterQuestionsBySearch returns 2 question objects if search is two tags that match two questions", () => {
        const result = filterQuestionsBySearch(_questions, "[javascript] [android-studio]");
        expect(result.length).toEqual(2);
        expect(result[0]._id).toEqual("65e9b58910afe6e94fc6e6dc");
        expect(result[1]._id).toEqual("65e9b5a995b6c7045a30d823");
    });

    // addTag
    test("addTag returns the tag id if the tag already exists", async () => {
        mockingoose(Tag).toReturn(_tag1, "findOne");

        let result = await addTag("react");
        expect(result.toString()).toEqual(_tag1._id);

        result = await addTag("javascript");
        expect(result.toString()).toEqual(_tag2._id);

        result = await addTag("android-studio");
        expect(result.toString()).toEqual(_tag3._id);

        result = await addTag("shared-preferences");
        expect(result.toString()).toEqual(_tag4._id);
    });

    test("addTag returns the tag id if the tag does not exist", async () => {
        mockingoose(Tag).toReturn(null, "findOne");
        mockingoose(Tag).toReturn(_tag1, "save");

        let result = await addTag("react");
        expect(result.toString()).toEqual(_tag1._id);
    });

    // getNewestQuestion
    test("getNewestQuestion returns questions sorted by ask_date_time in descending order", async () => {
        mockingoose(Question).toReturn(_questions, "find");

        const result = await getNewestQuestion();

        expect(result.length).toEqual(4);
        expect(result[0]._id.toString()).toEqual("65e9b716ff0e892116b2de09");
        expect(result[1]._id.toString()).toEqual("65e9b9b44c052f0a08ecade0");
        expect(result[2]._id.toString()).toEqual("65e9b5a995b6c7045a30d823");
        expect(result[3]._id.toString()).toEqual("65e9b58910afe6e94fc6e6dc");
    });

    // getUnansweredQuestion
    test("getUnansweredQuestion returns questions with no answers", async () => {
        mockingoose(Question).toReturn(_questions, "find");

        const result = await getUnansweredQuestion();

        expect(result.length).toEqual(2);
        expect(result[0]._id.toString()).toEqual("65e9b716ff0e892116b2de09");
        expect(result[1]._id.toString()).toEqual("65e9b9b44c052f0a08ecade0");
    });

    // getActiveQuestion
    test("getActiveQuestion returns questions sorted by newest answer date", async () => {
        mockingoose(Question).toReturn(_questions, "find");

        const result = await getActiveQuestion();

        expect(result.length).toEqual(4);
        expect(result[0]._id.toString()).toEqual("65e9b5a995b6c7045a30d823");
        expect(result[1]._id.toString()).toEqual("65e9b58910afe6e94fc6e6dc");
        expect(result[2]._id.toString()).toEqual("65e9b716ff0e892116b2de09");
        expect(result[3]._id.toString()).toEqual("65e9b9b44c052f0a08ecade0");
    });

    // parseTags
    test("parseTags returns an array of tags", () => {
        const result = parseTags("[react] [javascript] [android-studio]");
        expect(result.length).toEqual(3);
        expect(result[0]).toEqual("react");
        expect(result[1]).toEqual("javascript");
        expect(result[2]).toEqual("android-studio");
    });

    // parseKeyword
    test("parseKeyword returns a string", () => {
        const result = parseKeyword("Programmatically navigate using React router");
        expect(result).toEqual(["Programmatically", "navigate", "using", "React", "router"]);
    });

    // checkTagInQuestion
    test("checkTagInQuestion returns true if the question contains the tag", () => {
        const result = checkTagInQuestion(_questions[0], ["android-studio"]);
        expect(result).toEqual(true);
    });

    test("checkTagInQuestion returns false if the question does not contain the tag", () => {
        const result = checkTagInQuestion(_questions[0], ["react"]);
        expect(result).toEqual(false);
    });

    // checkKeywordInQuestion
    test("checkKeywordInQuestion returns true if the question contains the keyword", () => {
        const result = checkKeywordInQuestion(_questions[3], [
            "Programmatically",
            "navigate",
            "using",
            "React",
            "router",
        ]);
        expect(result).toEqual(true);
    });

    test("checkKeywordInQuestion returns false if the question does not contain the keyword", () => {
        const result = checkKeywordInQuestion(_questions[3], ["storage"]);
        expect(result).toEqual(false);
    });

    // setNewestAnswerDate
    test("setNewestAnswerDate returns the question with the newest answer date", () => {
        const question = _questions[0];
        let result = setNewestAnswerDate(question, question.answers[0].ans_date_time);
        result = setNewestAnswerDate(question, question.answers[1].ans_date_time);
        expect(question._id).toEqual("65e9b58910afe6e94fc6e6dc");
        expect(question.new_ans_date).toEqual(new Date("2024-03-02T02:02:02"));
    });
});

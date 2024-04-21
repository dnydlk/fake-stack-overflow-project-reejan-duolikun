// Setup database with initial test data.

let Tag = require("./models/tags");
let Answer = require("./models/answers");
let Question = require("./models/questions");
let User = require("./models/user");
let Vote = require("./models/votes");

const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");

mongoose.connect(MONGO_URL);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create a tag
function tagCreate(name) {
    let tag = new Tag({ name: name });
    return tag.save();
}

// Create an answer
function answerCreate(text, ans_by, ans_date_time, votes = []) {
    // let answerDetail = { text: text };
    // // Add ans_by
    // if (ans_by != false) answerDetail.ans_by = ans_by;
    // // Add ans_date_time
    // if (ans_date_time != false) answerDetail.ans_date_time = ans_date_time;
    // // Add votes
    // if (votes != false) answerDetail.votes = votes;
    let answerDetail = {
        text: text,
        ans_by: ans_by,
        ans_date_time: ans_date_time,
        votes: votes,
    };
    // Create the answer
    let answer = new Answer(answerDetail);
    return answer.save();
}

// Create a question
function questionCreate(
    title,
    text,
    tags,
    answers,
    asked_by,
    ask_date_time,
    views,
    isFlagged = false,
    flaggedBy = null
) {
    questionDetail = {
        title: title,
        text: text,
        tags: tags,
        asked_by: asked_by,
    };
    if (answers != false) questionDetail.answers = answers;
    if (ask_date_time != false) questionDetail.ask_date_time = ask_date_time;
    if (views != false) questionDetail.views = views;
    if (isFlagged != false) questionDetail.isFlagged = isFlagged;
    if (flaggedBy != false) questionDetail.flaggedBy = flaggedBy;

    let newQuestion = new Question(questionDetail);
    return newQuestion.save();
}

// Create a user
function userCreate(email, password, username, role = "user") {
    userDetail = {
        email: email,
        password: password,
        username: username,
        role: role,
    };
    let newUser = new User(userDetail);
    return newUser.save();
}

// Create a vote
function voteCreate(user, answer, voteType) {
    voteDetail = {
        user: user,
        answer: answer,
        voteType: voteType,
    };
    let newVote = new Vote(voteDetail);
    return newVote.save();
}

// Push vote to answer schema
async function pushVoteToAnswer(answerId, vote) {
    try {
        const updatedDoc = await Answer.findOneAndUpdate({ _id: answerId }, { $push: { votes: vote } }, { new: true });
        console.log(updatedDoc);
    } catch (err) {
        console.log("Something wrong with pushing votes to Answer schema:", err);
    }
}

// Push user asked questions to user schema
async function pushAskedQuestionToUser(userId, questionId) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { askedQuestion: questionId } },
            { new: true }
        );
        console.log("Updated user with new asked question:", updatedUser);
    } catch (err) {
        console.log("Error updating user with new asked question:", err);
    }
}

// Push user answered questions to user schema
async function pushAnsweredQuestionToUser(userId, answerId) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { answeredQuestion: answerId } },
            { new: true }
        );
        console.log("Updated user with new answered question:", updatedUser);
    } catch (err) {
        console.log("Error updating user with new answered question:", err);
    }
}

// Push user voted answers to user schema
async function pushVotedAnswerToUser(userId, voteId) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { votedAnswer: voteId } },
            { new: true }
        );
        console.log("Updated user with new voted answer:", updatedUser);
    } catch (err) {
        console.log("Error updating user with new voted answer:", err);
    }
}

const init = async () => {
    console.log("insert test data into the database");
    // Create tags
    let t1 = await tagCreate("react");
    let t2 = await tagCreate("javascript");
    let t3 = await tagCreate("android-studio");
    let t4 = await tagCreate("shared-preferences");
    let t5 = await tagCreate("storage");
    let t6 = await tagCreate("website");
    let t7 = await tagCreate("Flutter");

    // Create users
    let testUser1 = await userCreate(
        "test@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "testUser1"
    );
    let moderator = await userCreate(
        "m@moderator.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "moderator",
        "moderator"
    );
    let hamkalo = await userCreate(
        "hamkalo@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "hamkalo"
    );
    let azad = await userCreate(
        "azad@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "azad"
    );
    let abaya = await userCreate(
        "abaya@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "abaya"
    );
    let alia = await userCreate(
        "alia@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "alia"
    );
    let sana = await userCreate(
        "sana@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "sana"
    );
    let abhi3241 = await userCreate(
        "abhi3241@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "abhi3241"
    );
    let mackson3332 = await userCreate(
        "mackson3332@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "mackson3332"
    );
    let ihba001 = await userCreate(
        "ihba001@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "ihba001"
    );
    let JojiJohn = await userCreate(
        "JojiJohn@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "JojiJohn"
    );
    let saltyPeter = await userCreate(
        "saltyPeter@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "saltyPeter"
    );
    let monkeyABC = await userCreate(
        "monkeyABC@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "monkeyABC"
    );
    let elephantCDE = await userCreate(
        "elephantCDE@test.com",
        "$2b$10$KstvxSoZMucELhIvvlKF8OXg2jZS8LcNtGytDzQ9B1Y50.ROfSUcS", // password: q1234567
        "elephantCDE"
    );

    // Create answers
    let a1 = await answerCreate(
        "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
        hamkalo,
        new Date("2023-11-20T03:24:42")
    );
    let a2 = await answerCreate(
        "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        azad,
        new Date("2023-11-23T08:24:00")
    );
    let a3 = await answerCreate(
        "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.",
        abaya,
        new Date("2023-11-18T09:24:00")
    );
    let a4 = await answerCreate(
        "YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);",
        alia,
        new Date("2023-11-12T03:30:00")
    );
    let a5 = await answerCreate(
        "I just found all the above examples just too confusing, so I wrote my own. ",
        sana,
        new Date("2023-11-01T15:24:19")
    );
    let a6 = await answerCreate("Storing content as BLOBs in databases.", abhi3241, new Date("2023-02-19T18:20:59"));
    let a7 = await answerCreate(
        "Using GridFS to chunk and store content.",
        mackson3332,
        new Date("2023-02-22T17:19:00")
    );
	let a8 = await answerCreate("Store data in a SQLLite database.", ihba001, new Date("2023-03-22T21:17:53"));
    let a9 = await answerCreate("test answer for testing", testUser1, new Date("2023-04-20T21:17:53"));

    // Create questions
    let q1 = await questionCreate(
        "Programmatically navigate using React router",
        "the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.",
        [t1, t2],
        [a1, a2],
        JojiJohn,
        new Date("2022-01-20T03:00:00"),
        10
    );
    let q2 = await questionCreate(
        "android studio save string shared preference, start activity and load the saved string",
        "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.",
        [t3, t4, t2],
        [a3, a4, a5],
        saltyPeter,
        new Date("2023-01-10T11:24:30"),
        121
    );
    let q3 = await questionCreate(
        "Object storage for a web application",
        "I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.",
        [t5, t6],
        [a6, a7],
        monkeyABC,
        new Date("2023-02-18T01:02:15"),
        200
    );
    let q4 = await questionCreate(
        "Quick question about storage on android",
        "I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains",
        [t3, t4, t5],
        [a8],
        elephantCDE,
        new Date("2023-03-10T14:28:01"),
        103
    );
    let q5 = await questionCreate(
        "test question for flagging",
        "test question for flagging",
        [t1, t2],
        [a9],
        testUser1,
        new Date("2024-04-10T14:28:01"),
        5,
        true,
        elephantCDE
    );

    // Create votes
    let v1 = await voteCreate(hamkalo, a1, true);
    let v3 = await voteCreate(azad, a1, true);
    let v2 = await voteCreate(hamkalo, a2, false);
    let v4 = await voteCreate(azad, a2, false);
    let v5 = await voteCreate(abaya, a3, true);
    let v6 = await voteCreate(abaya, a4, false);
    let v7 = await voteCreate(abaya, a5, false);
    let v8 = await voteCreate(alia, a3, true);
    let v9 = await voteCreate(alia, a6, false);
    let v10 = await voteCreate(alia, a7, true);
    let v11 = await voteCreate(sana, a6, false);
    let v12 = await voteCreate(sana, a7, true);
    let v13 = await voteCreate(abhi3241, a6, false);
    let v14 = await voteCreate(abhi3241, a7, true);
    let v15 = await voteCreate(mackson3332, a8, true);
    let v16 = await voteCreate(mackson3332, a7, true);
    let v17 = await voteCreate(ihba001, a8, true);
    let v18 = await voteCreate(ihba001, a7, true);
    let v19 = await voteCreate(JojiJohn, a8, true);
    let v20 = await voteCreate(saltyPeter, a8, true);
    let v21 = await voteCreate(testUser1, a9, true);

    // Push votes to answer schema
    await pushVoteToAnswer(a1, v1);
    await pushVoteToAnswer(a2, v2);
    await pushVoteToAnswer(a1, v3);
    await pushVoteToAnswer(a2, v4);
    await pushVoteToAnswer(a3, v5);
    await pushVoteToAnswer(a4, v6);
    await pushVoteToAnswer(a5, v7);
    await pushVoteToAnswer(a3, v8);
    await pushVoteToAnswer(a6, v9);
    await pushVoteToAnswer(a7, v10);
    await pushVoteToAnswer(a6, v11);
    await pushVoteToAnswer(a7, v12);
    await pushVoteToAnswer(a6, v13);
    await pushVoteToAnswer(a7, v14);
    await pushVoteToAnswer(a1, v1);
    await pushVoteToAnswer(a2, v2);
    await pushVoteToAnswer(a8, v15);
    await pushVoteToAnswer(a7, v16);
    await pushVoteToAnswer(a8, v17);
    await pushVoteToAnswer(a7, v18);
    await pushVoteToAnswer(a8, v19);
    await pushVoteToAnswer(a8, v20);
    await pushVoteToAnswer(a9, v21);

    // Push user asked questions to user schema
    await pushAskedQuestionToUser(JojiJohn, q1);
    await pushAskedQuestionToUser(saltyPeter, q2);
    await pushAskedQuestionToUser(monkeyABC, q3);
    await pushAskedQuestionToUser(elephantCDE, q4);
    await pushAskedQuestionToUser(testUser1, q5);

    // Push user answered questions to user schema
    await pushAnsweredQuestionToUser(hamkalo, a1);
    await pushAnsweredQuestionToUser(azad, a2);
    await pushAnsweredQuestionToUser(abaya, a3);
    await pushAnsweredQuestionToUser(alia, a4);
    await pushAnsweredQuestionToUser(sana, a5);
    await pushAnsweredQuestionToUser(abhi3241, a6);
    await pushAnsweredQuestionToUser(mackson3332, a7);
    await pushAnsweredQuestionToUser(ihba001, a8);
    await pushAnsweredQuestionToUser(testUser1, a9);

    // Push user voted answers to user schema
    await pushVotedAnswerToUser(hamkalo, v1);
    await pushVotedAnswerToUser(azad, v3);
    await pushVotedAnswerToUser(hamkalo, v2);
    await pushVotedAnswerToUser(azad, v4);
    await pushVotedAnswerToUser(abaya, v5);
    await pushVotedAnswerToUser(abaya, v6);
    await pushVotedAnswerToUser(abaya, v7);
    await pushVotedAnswerToUser(alia, v8);
    await pushVotedAnswerToUser(alia, v9);
    await pushVotedAnswerToUser(alia, v10);
    await pushVotedAnswerToUser(sana, v11);
    await pushVotedAnswerToUser(sana, v12);
    await pushVotedAnswerToUser(abhi3241, v13);
    await pushVotedAnswerToUser(abhi3241, v14);
    await pushVotedAnswerToUser(mackson3332, v15);
    await pushVotedAnswerToUser(mackson3332, v16);
    await pushVotedAnswerToUser(ihba001, v17);
    await pushVotedAnswerToUser(ihba001, v18);
    await pushVotedAnswerToUser(JojiJohn, v19);
	await pushVotedAnswerToUser(saltyPeter, v20);
    await pushVotedAnswerToUser(testUser1, v21);

    // Close the database connection if it is open
    if (db) db.close();
    console.log("\ndone\n");
};

init().catch((err) => {
    console.log("ERROR: " + err);
    if (db) db.close();
});

console.log("processing ...");

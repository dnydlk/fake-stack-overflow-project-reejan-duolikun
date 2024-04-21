// function getDataCyTest(selector) defined in cypress/support/commands.js
import { BrowserRouter as Router } from "react-router-dom";
import AnswerPage from "../../src/components/main/answerPage";
import { getMetaData } from "../../src/tool";

const testQuestion = {
    _id: "66254fa7dfdded16371bff65",
    title: "test question for flagging",
    text: "test question for flagging",
    tags: ["66254fa7dfdded16371bff1f", "66254fa7dfdded16371bff23"],
    answers: [
        {
            _id: "66254fa7dfdded16371bff5b",
            text: "test answer for testing",
            ans_by: {
                _id: "66254fa7dfdded16371bff2f",
                username: "testUser1",
            },
            ans_date_time: "2023-04-21T01:17:53.000Z",
            votes: ["66254fa7dfdded16371bff8f"],
            __v: 0,
        },
    ],
    asked_by: {
        _id: "66254fa7dfdded16371bff2f",
        username: "testUser1",
    },
    ask_date_time: "2024-04-10T18:28:01.000Z",
    views: 13,
    isFlagged: true,
    flaggedBy: "66254fa7dfdded16371bff2f",
    __v: 0,
};

describe("<AnswerPage />", () => {
    beforeEach(() => {
        const handleNewQuestion = cy.spy().as("handleNewQuestionSpy");
        const handleNewAnswer = cy.spy().as("handleNewAnswerSpy");
        const currentUser = {
            _id: "66254fa7dfdded16371bff2f",
            email: "test@test.com",
            username: "testUser1",
            location: "Location not provided",
            title: "Title not provided",
            aboutMe: "About me not provided",
            link: "Link not provided",
            askedQuestion: [
                {
                    _id: "66254fa7dfdded16371bff65",
                    title: "test question for flagging",
                    text: "test question for flagging",
                    tags: [
                        {
                            _id: "66254fa7dfdded16371bff1f",
                            name: "react",
                            __v: 0,
                        },
                        {
                            _id: "66254fa7dfdded16371bff23",
                            name: "javascript",
                            __v: 0,
                        },
                    ],
                    answers: [
                        {
                            _id: "66254fa7dfdded16371bff5b",
                            text: "test answer for testing",
                            ans_by: "66254fa7dfdded16371bff2f",
                            ans_date_time: "2023-04-21T01:17:53.000Z",
                            votes: ["66254fa7dfdded16371bff8f"],
                            __v: 0,
                        },
                    ],
                    asked_by: "66254fa7dfdded16371bff2f",
                    ask_date_time: "2024-04-10T18:28:01.000Z",
                    views: 5,
                    isFlagged: true,
                    flaggedBy: "66254fa7dfdded16371bff49",
                    __v: 0,
                },
            ],
            answeredQuestion: [
                {
                    _id: "66254fa7dfdded16371bff5b",
                    text: "test answer for testing",
                    ans_by: {
                        _id: "66254fa7dfdded16371bff2f",
                        email: "test@test.com",
                        username: "testUser1",
                        location: "Location not provided",
                        title: "Title not provided",
                        aboutMe: "About me not provided",
                        link: "Link not provided",
                        askedQuestion: ["66254fa7dfdded16371bff65"],
                        answeredQuestion: ["66254fa7dfdded16371bff5b"],
                        votedAnswer: ["66254fa7dfdded16371bff8f"],
                        role: "user",
                        __v: 0,
                    },
                    ans_date_time: "2023-04-21T01:17:53.000Z",
                    votes: ["66254fa7dfdded16371bff8f"],
                    __v: 0,
                },
            ],
            votedAnswer: [
                {
                    _id: "66254fa7dfdded16371bff8f",
                    user: "66254fa7dfdded16371bff2f",
                    answer: "66254fa7dfdded16371bff5b",
                    voteType: true,
                    createdAt: "2024-04-21T17:40:55.958Z",
                    updatedAt: "2024-04-21T17:40:55.958Z",
                    __v: 0,
                },
            ],
            role: "user",
            __v: 0,
        };

        cy.intercept("GET", "http://localhost:8000/question/getQuestionById/1", { body: testQuestion }).as(
            "getQuestionById"
        );
        cy.intercept("GET", `http://localhost:8000/vote/current-vote?answerId=${testQuestion.answers[0]._id}`, {
            currentVotes: 2,
        });

        cy.mount(
            <Router>
                <AnswerPage
                    qid="1"
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    currentUser={currentUser}
                />
            </Router>
        );
    });

    it("successfully renders with fetched data", () => {
        cy.getDataCyTest("answer-page-question-title").should("contain.text", testQuestion.title);
        cy.getDataCyTest("answer-page-question-text").should("contain.text", testQuestion.text);
        cy.getDataCyTest("answer-page-question-asked-by").should("contain.text", testQuestion.asked_by.username);
        cy.getDataCyTest("answer-page-question-asked-meta").should(
            "contain.text",
            getMetaData(new Date(testQuestion.ask_date_time))
        );
    });

    it("shows flag button when currentUser is user", () => {
        cy.getDataCyTest("answer-page-flag").should("exist");
    });

    it("shows flag button when currentUser is moderator", () => {
        const moderator = {
            role: "moderator",
        };
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        const handleNewAnswerSpy = cy.spy().as("handleNewAnswerSpy");
        cy.mount(
            <Router>
                <AnswerPage
                    qid="1"
                    handleNewQuestion={handleNewQuestionSpy}
                    handleNewAnswer={handleNewAnswerSpy}
                    currentUser={moderator}
                />
            </Router>
        );
        cy.getDataCyTest("answer-page-flag").should("exist");
    });

    it("successfully renders answers", () => {
        cy.getDataCyTest("answer-page-answer").should("have.length", 1);
        cy.getDataCyTest("answer-page-answer").should("contain.text", testQuestion.answers[0].text);
        cy.getDataCyTest("answer-page-answer-by").should("contain.text", testQuestion.answers[0].ans_by.username);
        cy.getDataCyTest("answer-page-answer-meta").should(
            "contain.text",
            getMetaData(new Date(testQuestion.answers[0].ans_date_time))
        );
    });

    it("successfully renders answer count", () => {
        cy.getDataCyTest("answer-page-answer-count").should("contain.text", testQuestion.answers.length);
    });

    it("successfully triggers handleNewAnswer", () => {
        cy.getDataCyTest("answer-page-post-answer").click();
        cy.get("@handleNewAnswerSpy").should("have.been.called");
    });
});

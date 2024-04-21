// function getDataCyTest(selector) defined in cypress/support/commands.js
import AnswerPage from "../../src/components/main/answerPage";
import { getMetaData } from "../../src/tool";

const testQuestion = {
    _id: "66220a767d06af88a828eebc",
    title: "test",
    text: "test",
    tags: ["66220a767d06af88a828eeba"],
    answers: [
        {
            _id: "66220a7b7d06af88a828eec2",
            text: "test",
            ans_by: { username: "test" },
            ans_date_time: "2024-04-19T06:08:59.512Z",
            votes: ["66220a837d06af88a828eee1"],
        },
    ],
    asked_by: { username: "test" },
    ask_date_time: "2024-01-19T06:08:54.948Z",
    views: 6,
    __v: 0,
};

describe("<AnswerPage />", () => {
    beforeEach(() => {
        const handleNewQuestion = cy.spy().as("handleNewQuestionSpy");
        const handleNewAnswer = cy.spy().as("handleNewAnswerSpy");

        cy.intercept("GET", "http://localhost:8000/question/getQuestionById/1", { body: testQuestion }).as(
            "getQuestionById"
        );
        cy.intercept("GET", `http://localhost:8000/vote/current-vote?answerId=${testQuestion.answers[0]._id}`, {
            currentVotes: 2,
        });

        cy.mount(<AnswerPage qid="1" handleNewQuestion={handleNewQuestion} handleNewAnswer={handleNewAnswer} />);
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

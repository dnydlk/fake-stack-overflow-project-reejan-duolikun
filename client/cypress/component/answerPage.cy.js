// function getDataCyTest(selector) defined in cypress/support/commands.js
import AnswerPage from "../../src/components/main/answerPage";

const questionData = {
    title: "How does React work?",
    views: 100,
    text: "Can someone explain how React's reconciliation algorithm works?",
    asked_by: "Jane Doe",
    ask_date_time: "2024-04-01T00:00:00Z",
    answers: [
        {
            text: "React uses a virtual DOM to optimize updates.",
            ans_by: "John Doe",
            ans_date_time: "2024-04-10T00:00:00Z",
        },
    ],
};

describe("<AnswerPage />", () => {
    beforeEach(() => {
        const handleNewQuestion = cy.spy().as("handleNewQuestionSpy");
        const handleNewAnswer = cy.spy().as("handleNewAnswerSpy");

        cy.intercept("GET", "http://localhost:8000/question/getQuestionById/1", { body: questionData }).as(
            "getQuestionById"
        );

        cy.mount(<AnswerPage qid="1" handleNewQuestion={handleNewQuestion} handleNewAnswer={handleNewAnswer} />);
    });

    it("successfully renders with fetched data", () => {
        cy.getDataCyTest("answer-page-question-title").should("contain.text", questionData.title);
        cy.getDataCyTest("answer-page-question-text").should("contain.text", questionData.text);
        cy.getDataCyTest("answer-page-question-asked-by").should("contain.text", questionData.asked_by);
        cy.getDataCyTest("answer-page-question-asked-meta").should("contain.text", "Mar 31 at 20:00:00");
    });

    it("successfully renders answers", () => {
        cy.getDataCyTest("answer-page-answer").should("have.length", 1);
        cy.getDataCyTest("answer-page-answer").should("contain.text", questionData.answers[0].text);
        cy.getDataCyTest("answer-page-answer-by").should("contain.text", questionData.answers[0].ans_by);
        cy.getDataCyTest("answer-page-answer-meta").should("contain.text", "Apr 09 at 20:00:00");
    });

    it("successfully renders answer count", () => {
        cy.getDataCyTest("answer-page-answer-count").should("contain.text", "1Answer");
    });

    it.only("successfully triggers handleNewAnswer", () => {
        cy.getDataCyTest("answer-page-post-answer").click();
        cy.get("@handleNewAnswerSpy").should("have.been.called");
    });
});

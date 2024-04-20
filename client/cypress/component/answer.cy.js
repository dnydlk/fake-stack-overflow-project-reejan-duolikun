// function getDataCyTest(selector) defined in cypress/support/commands.js
import Answer from "../../src/components/main/answerPage/answer";
import { getMetaData } from "../../src/tool";

const testAnswer = {
    _id: "66220a7b7d06af88a828eec2",
    text: "test",
    ans_by: { username: "user" },
    ans_date_time: "2024-01-19T06:08:59.512Z",
    votes: ["66220a837d06af88a828eee1"],
};

describe("<Answer />", () => {
    it("Answer renders correctly", () => {
        cy.intercept("GET", `http://localhost:8000/vote/current-vote?answerId=${testAnswer._id}`, {
            currentVotes: 2,
        });
        cy.mount(<Answer answer={testAnswer} />);
        cy.getDataCyTest("answer-page-up-vote-button").should("exist");
        cy.getDataCyTest("answer-page-down-vote-button").should("exist");
        cy.getDataCyTest("answer-page-current-votes").should("contain.text", "2");
        cy.getDataCyTest("answer-page-answer-text").should("contain.text", testAnswer.text);
        cy.getDataCyTest("answer-page-answer-by").should("contain.text", testAnswer.ans_by.username);
        cy.getDataCyTest("answer-page-answer-meta").should(
            "contain.text",
            getMetaData(new Date(testAnswer.ans_date_time))
        );
    });
});

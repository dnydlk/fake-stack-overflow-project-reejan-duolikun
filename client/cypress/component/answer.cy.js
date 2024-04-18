// function getDataCyTest(selector) defined in cypress/support/commands.js
import Answer from "../../src/components/main/answerPage/answer";

describe("<Answer />", () => { 
    it("Answer renders correctly", () => {
        const text = "Test Answer";
        const ansBy = "Test User";
        const meta = "2021-09-01";
        cy.mount(<Answer text={text} ansBy={ansBy} meta={meta} />);
        cy.getDataCyTest("answer-page-answer").should("exist");
        cy.getDataCyTest("answer-page-answer-by").should("contain.text", ansBy);
        cy.getDataCyTest("answer-page-answer-meta").should("contain.text", meta);
    });
})
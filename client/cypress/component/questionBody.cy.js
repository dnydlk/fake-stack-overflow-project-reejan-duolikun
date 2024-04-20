// function getDataCyTest(selector) defined in cypress/support/commands.js
import QuestionBody from "../../src/components/main/answerPage/questionBody";

describe("<QuestionBody />", () => {  
    it("QuestionBody shows text correctly", () => {  
        const text = "Test Text";
        const askBy = "Test Ask By";
        const meta = "Test Meta";
        cy.mount(<QuestionBody text={text} askBy={askBy} meta={meta} />);
        cy.getDataCyTest("answer-page-question-text").should("have.text", text);
    });

    it("QuestionBody shows askBy correctly", () => {  
        const text = "Test Text";
        const askBy = "Test Ask By";
        const meta = "Test Meta";
        cy.mount(<QuestionBody text={text} askBy={askBy} meta={meta} />);
        cy.getDataCyTest("answer-page-question-asked-by").should("have.text", askBy);
    });

    it("QuestionBody shows meta correctly", () => {  
        const text = "Test Text";
        const askBy = "Test Ask By";
        const meta = "Test Meta";
        cy.mount(<QuestionBody text={text} askBy={askBy} meta={meta} />);
        cy.getDataCyTest("answer-page-question-asked-meta").should("have.text", `asked ${meta}`);
    });
})
// function getDataCyTest(selector) defined in cypress/support/commands.js
import AnswerHeader from "../../src/components/main/answerPage/header";

describe("<AnswerHeader />", () => { 
    it("AnswerHeader shows title correctly", () => { 
        const title = "Test Title";
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(<AnswerHeader title={title} handleNewQuestion={handleNewQuestionSpy} />);
        cy.getDataCyTest("answer-page-question-title").should("have.text", title);
    });

    it("AnswerHeader shows meta correctly", () => { 
        const meta = "Test Meta";
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestion");
        cy.mount(<AnswerHeader meta={meta} handleNewQuestion={handleNewQuestionSpy} />);
        cy.getDataCyTest("answer-page-question-meta").should("have.text", meta);
    });

    it("AnswerHeader shows views correctly", () => { 
        const views = 5;
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestion");
        cy.mount(<AnswerHeader views={views} handleNewQuestion={handleNewQuestionSpy} />);
        cy.get(".fso-answer-title-detail-text").should("have.text", `${views} times`);
    });

    it("AnswerHeader shows Ask a Question button", () => { 
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestion");
        cy.mount(<AnswerHeader handleNewQuestion={handleNewQuestionSpy} />);
        cy.getDataCyTest("ask-question-btn").should("have.text", "Ask Question");
    })

    it("AnswerHeader calls handleNewQuestion on Ask a Question button click", () => { 
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(<AnswerHeader handleNewQuestion={handleNewQuestionSpy} />);
        cy.getDataCyTest("ask-question-btn").click();
        cy.get("@handleNewQuestionSpy").should("have.been.called");
    })
})
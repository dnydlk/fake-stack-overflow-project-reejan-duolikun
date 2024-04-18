// function getDataCyTest(selector) defined in cypress/support/commands.js
import NewAnswer from "../../src/components/main/newAnswer";

describe("<NewAnswer />", () => { 
    it("NewAnswer shows username and answer text input fields", () => {
        const qid = "fakeQid";
        const handleAnswer = cy.stub();
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswer} />);
        cy.get("#answerUsernameInput").should("exist");
        cy.get("#answerTextInput").should("exist");
    });
    
    it("NewAnswer shows error message when username is empty", () => {
        const qid = "fakeQid";
        const handleAnswer = cy.stub();
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswer} />);
        cy.get("#answerTextInput").type("test");
        cy.getDataCyTest("answer-page-post-answer-button").click();
        cy.getDataCyTest("fso-input-error").should("exist");
    });
    
    it("NewAnswer shows error message when answer text is empty", () => {
        const qid = "fakeQid";
        const handleAnswer = cy.stub();
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswer} />);
        cy.get("#answerUsernameInput").type("test");
        cy.getDataCyTest("answer-page-post-answer-button").click();
        cy.getDataCyTest("fso-input-error").should("exist");
    });
    
    //todo: fix this test
    // it.only("Click on post answer button should call handleAnswer", () => {
    //     const qid = "fakeQid";
    //     const handleAnswerSpy = cy.spy().as("handleAnswerSpy")
    //     cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswerSpy} />);
    //     cy.get("#answerUsernameInput").type("test");
    //     cy.get("#answerTextInput").type("test");
    //     cy.getDataCyTest("answer-page-post-answer-button").click();
    //     cy.get("@handleAnswerSpy").should("have.been.calledOnce");
    // })
})
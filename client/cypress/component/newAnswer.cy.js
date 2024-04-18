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
    
    it("Click on post answer button should call handleAnswer", () => {
        const qid = "fakeQid";
        const handleAnswerSpy = cy.stub().as("handleAnswerSpy");
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswerSpy} />);
        cy.get("#answerUsernameInput").type("test");
        cy.get("#answerTextInput").type("test");
        cy.intercept("POST", "http://localhost:8000/answer/addAnswer", {
            statusCode: 200,
            body: {
                _id: "12345",
                message: "Answer added successfully",
            },
        }).as("addAnswer");
        cy.getDataCyTest("answer-page-post-answer-button").click();
        cy.get("@handleAnswerSpy").should("have.been.calledOnce");
    });

})
// function getDataCyTest(selector) defined in cypress/support/commands.js
import NewAnswer from "../../src/components/main/newAnswer";

describe("<NewAnswer />", () => {
    const currentUser = { username: "testUser" };
    const qid = "fakeQid";

    it("NewAnswer shows username and answer text input fields", () => {
        const handleAnswer = cy.stub();
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswer} currentUser={currentUser} />);
        cy.get("#answerUsernameInput").should("exist");
        cy.get("#answerTextInput").should("exist");
    });

    it("NewAnswer shows username from currentUser", () => {
        const handleAnswer = cy.stub();
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswer} currentUser={currentUser} />);
        cy.get("#answerUsernameInput").should("have.value", "testUser");
    });

    it("NewAnswer shows error message when answer text is empty", () => {
        const handleAnswer = cy.stub();
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswer} currentUser={currentUser} />);
        cy.getDataCyTest("answer-page-post-answer-button").click();
        cy.getDataCyTest("fso-input-error").should("exist");
    });

    it("Click on post answer button should call handleAnswer", () => {
        cy.intercept("POST", "http://localhost:8000/answer/addAnswer", {
            statusCode: 200,
            body: {
                _id: "12345",
                message: "Answer added successfully",
            },
        }).as("addAnswer");

        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<NewAnswer qid={qid} handleAnswer={handleAnswerSpy} currentUser={currentUser} />);
        // cy.get("#answerUsernameInput").type("test");
        cy.get("#answerTextInput").type("test");

        cy.getDataCyTest("answer-page-post-answer-button").click();
        cy.get("@handleAnswerSpy").should("have.been.calledOnce");
    });
});

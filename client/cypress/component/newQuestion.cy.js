// function getDataCyTest(selector) defined in cypress/support/commands.js
import NewQuestion from "../../src/components/main/newQuestion";

describe("<NewQuestion />", () => {
    it("NewQuestion shows title correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.getDataCyTest("fso-input-title").should("contain.text", "Question Title*");
        cy.getDataCyTest("fso-input-title").should("contain.text", "Question Text*");
        cy.getDataCyTest("fso-input-title").should("contain.text", "Tags*");
        cy.getDataCyTest("fso-input-title").should("contain.text", "Username*");
    });

    it("NewQuestion shows all hints correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.getDataCyTest("fso-input-hint").should("contain.text", "Limit title to 100 characters or less");
        cy.getDataCyTest("fso-input-hint").should("contain.text", "Add details");
        cy.getDataCyTest("fso-input-hint").should("contain.text", "Add keywords separated by whitespace");
    });

    it("NewQuestion shows all errors correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Title cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Username cannot be empty");
    });

    it("NewQuestion shows each errors correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.get("#formTitleInput").type("Title");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Username cannot be empty");

        cy.get("#formTextInput").type("Text");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Username cannot be empty");

        cy.get("#formTagInput").type("Tag");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Username cannot be empty");
    });

    it("NewQuestion shows no error", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.get("#formTitleInput").type("Title");
        cy.get("#formTextInput").type("Text");
        cy.get("#formTagInput").type("Tag");
        cy.get("#formUsernameInput").type("Username");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("not.exist");
    });
});

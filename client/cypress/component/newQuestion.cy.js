// function getDateCyTest(selector) defined in cypress/support/commands.js
import NewQuestion from "../../src/components/main/newQuestion";

describe("<NewQuestion />", () => {
    it("NewQuestion shows title correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.getDateCyTest("fso-input-title").should("contain.text", "Question Title*");
        cy.getDateCyTest("fso-input-title").should("contain.text", "Question Text*");
        cy.getDateCyTest("fso-input-title").should("contain.text", "Tags*");
        cy.getDateCyTest("fso-input-title").should("contain.text", "Username*");
    });

    it("NewQuestion shows all hints correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.getDateCyTest("fso-input-hint").should("contain.text", "Limit title to 100 characters or less");
        cy.getDateCyTest("fso-input-hint").should("contain.text", "Add details");
        cy.getDateCyTest("fso-input-hint").should("contain.text", "Add keywords separated by whitespace");
    });

    it("NewQuestion shows all errors correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.getDateCyTest("fso-form-post-button").click();
        cy.getDateCyTest("fso-input-error").should("contain.text", "Title cannot be empty");
        cy.getDateCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDateCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
        cy.getDateCyTest("fso-input-error").should("contain.text", "Username cannot be empty");
    });

    it("NewQuestion shows each errors correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.get("#formTitleInput").type("Title");
        cy.getDateCyTest("fso-form-post-button").click();
        cy.getDateCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDateCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
        cy.getDateCyTest("fso-input-error").should("contain.text", "Username cannot be empty");

        cy.get("#formTextInput").type("Text");
        cy.getDateCyTest("fso-form-post-button").click();
        cy.getDateCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
        cy.getDateCyTest("fso-input-error").should("contain.text", "Username cannot be empty");

        cy.get("#formTagInput").type("Tag");
        cy.getDateCyTest("fso-form-post-button").click();
        cy.getDateCyTest("fso-input-error").should("contain.text", "Username cannot be empty");
    });

    it("NewQuestion shows no error", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} />);

        cy.get("#formTitleInput").type("Title");
        cy.get("#formTextInput").type("Text");
        cy.get("#formTagInput").type("Tag");
        cy.get("#formUsernameInput").type("Username");
        cy.getDateCyTest("fso-form-post-button").click();
        cy.getDateCyTest("fso-input-error").should("not.exist");
    });
});

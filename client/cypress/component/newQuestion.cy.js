// function getDataCyTest(selector) defined in cypress/support/commands.js
import NewQuestion from "../../src/components/main/newQuestion";

describe("<NewQuestion />", () => {
    const currentUser = { username: "testUser" };
    it("NewQuestion shows title correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);

        cy.getDataCyTest("fso-input-title").should("contain.text", "Question Title*");
        cy.getDataCyTest("fso-input-title").should("contain.text", "Question Text*");
        cy.getDataCyTest("fso-input-title").should("contain.text", "Tags*");
        cy.getDataCyTest("fso-input-title").should("contain.text", "Username*");
    });

    it("NewQuestion shows all hints correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);

        cy.getDataCyTest("fso-input-hint").should("contain.text", "Limit title to 100 characters or less");
        cy.getDataCyTest("fso-input-hint").should("contain.text", "Add details");
        cy.getDataCyTest("fso-input-hint").should("contain.text", "Add keywords separated by whitespace");
    });

    it("NewQuestion shows all errors correctly", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);

        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Title cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
    });

    it("NewQuestion shows title too short errors", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);
        cy.get("#formTitleInput").type("Deserunt");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Title must be at least 15 characters");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
    });

    it("NewQuestion shows text errors", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);
        cy.get("#formTitleInput").type("Minim aute duis anim aliqua.");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Question text cannot be empty");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
    });

    it("NewQuestion shows text too short errors", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);
        cy.get("#formTitleInput").type("Minim aute duis anim aliqua.");
        cy.get("#formTextInput").type("Minim aute duis anim aliqua.");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Question text must be at least 220 characters");
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
    });

    it("NewQuestion shows tag errors", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);
        cy.get("#formTitleInput").type("Minim aute duis anim aliqua.");
        cy.get("#formTextInput").type(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Ut enim ad minim veniam. Ut enim ad minim veniam. Ut enim ad minim veniam."
        );
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("contain.text", "Should have at least 1 tag");
    });

    it("NewQuestion shows no error", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);

        cy.get("#formTitleInput").type("Minim aute duis anim aliqua.");
        cy.get("#formTextInput").type(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Ut enim ad minim veniam. Ut enim ad minim veniam. Ut enim ad minim veniam."
        );
        cy.get("#formTagInput").type("Tag");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("fso-input-error").should("not.exist");
    });

    it("addQuestion should have been called", () => {
        const handleQuestionsSpy = cy.spy().as("handleQuestionsSpy");
        cy.intercept("POST", "http://localhost:8000/question/addQuestion", (req) => {
            req.reply({
                statusCode: 200,
                body: { _id: "12345" },
            });
        }).as("addQuestion");
        cy.mount(<NewQuestion handleQuestions={handleQuestionsSpy} currentUser={currentUser} />);

        cy.get("#formTitleInput").type("Minim aute duis anim aliqua.");
        cy.get("#formTextInput").type(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Ut enim ad minim veniam. Ut enim ad minim veniam. Ut enim ad minim veniam."
        );
        cy.get("#formTagInput").type("Tag");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.get("@handleQuestionsSpy").should("have.been.called");
    });
});

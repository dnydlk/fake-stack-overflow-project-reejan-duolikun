// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

// cy.get('[data-cy-test="main-page-header"]').contains(/All Questions/i);
// cy.get('[data-cy-test="main-page-header"]').should("contain.text", "All Questions");

describe("Tagging Post", () => {
    beforeEach(() => {
        cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit("/home");
    });

    it("Add a question with tags, checks the tags existied", () => {
        // login
        cy.getDataCyTest("ask-question-btn").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();
        // add a question with tags
        cy.getDataCyTest("ask-question-btn").click();
        cy.get("#formTitleInput").type("Test Question A ");
        cy.get("#formTextInput").type(
            "Test Question A Test: Do ipsum sit reprehenderit irure deserunt non officia incididunt quis quis irure ipsum pariatur. Do ipsum sit reprehenderit irure deserunt non officia incididunt quis quis irure ipsum pariatur irure."
        );
        cy.get("#formTagInput").type("test1 test2 test3");
        cy.getDataCyTest("fso-form-post-button").click();

        // clicks tags
        cy.contains("Tags").click();
        cy.contains("test1");
        cy.contains("test2");
        cy.contains("test3");
    });

    it("Checks if all tags exist", () => {
        cy.contains("Tags").click();
        cy.contains("react", { matchCase: false });
        cy.contains("javascript", { matchCase: false });
        cy.contains("android-studio", { matchCase: false });
        cy.contains("shared-preferences", { matchCase: false });
        cy.contains("storage", { matchCase: false });
        cy.contains("website", { matchCase: false });
        cy.contains("Flutter", { matchCase: false });
    });

    it("Checks if all questions exist inside tags", () => {
        cy.contains("Tags").click();
        cy.contains("7 Tags");
        cy.contains("1 question");
        cy.contains("2 question");
        cy.contains("0 question");
    });

    it("go to question in tag react", () => {
        cy.contains("Tags").click();
        cy.contains("react").click();
        cy.contains("Programmatically navigate using React router");
    });

    it("go to questions in tag storage", () => {
        cy.contains("Tags").click();
        cy.contains("storage").click();
        cy.contains("Quick question about storage on android");
        cy.contains("Object storage for a web application");
    });

    it("create a new question with a new tag and finds the question through tag", () => {
        // login
        cy.getDataCyTest("ask-question-btn").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.getDataCyTest("ask-question-btn").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type(
            "Test Question A Test: Do ipsum sit reprehenderit irure deserunt non officia incididunt quis quis irure ipsum pariatur. Do ipsum sit reprehenderit irure deserunt non officia incididunt quis quis irure ipsum pariatur irure."
        );
        cy.get("#formTagInput").type("test1-tag1");
        cy.getDataCyTest("fso-form-post-button").click();

        // clicks tags
        cy.contains("Tags").click();
        cy.contains("test1-tag1").click();
        cy.contains("Test Question A");
    });
	
	it("Clicks on a tag and verifies the tag is displayed", () => {
        const tagNames = "javascript";
        cy.contains("Tags").click();
        cy.contains(tagNames).click();
        cy.getDataCyTest("question-tags").each(($el, index, $list) => {
            cy.wrap($el).should("contain", tagNames);
        });
    });

    it("Clicks on a tag in homepage and verifies the questions related tag is displayed", () => {
        const tagNames = "storage";
        //clicks the 3rd tag associated with the question.
        cy.get(".fso-question-tag-button").eq(4).click();
        cy.get(".fso-question-tags").each(($el, index, $list) => {
            cy.wrap($el).should("contain", tagNames);
        });
    });
});

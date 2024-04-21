// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

// cy.get('[data-cy-test="main-page-header"]').contains(/All Questions/i);
// cy.get('[data-cy-test="main-page-header"]').should("contain.text", "All Questions");

describe("Post Moderation", () => {
    beforeEach(() => {
        cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit("/home");
    });

    it("Flagging a post", () => {
        const qTitles = [
            "test question for flagging",
            "Quick question about storage on android",
            "Object storage for a web application",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];
        cy.getDataCyTest("post-title").contains("test question for flagging").click();
        cy.getDataCyTest("flag-post-button").click();
        cy.contains("Post flagged successfully");
    });
});

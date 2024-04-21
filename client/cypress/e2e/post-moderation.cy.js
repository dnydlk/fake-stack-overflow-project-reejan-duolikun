// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

// cy.get('[data-cy-test="main-page-header"]').contains(/All Questions/i);
// cy.get('[data-cy-test="main-page-header"]').should("contain.text", "All Questions");

const qTitles = [
    "test question for flagging",
    "Quick question about storage on android",
    "Object storage for a web application",
    "android studio save string shared preference, start activity and load the saved string",
    "Programmatically navigate using React router",
];

describe("Post Moderation", () => {
    beforeEach(() => {
        cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit("/home");
    });

    it("Must log in to see the flag button", () => {
        cy.getDataCyTest("post-title").contains("Quick question about").click();
        cy.getDataCyTest("answer-page-flag").should("not.exist");
    });

    it("Flag a post", () => {
        // login
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.getDataCyTest("post-title").contains("Quick question about").click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.contains("This question has been flagged");
    });

    it("Unflag a post", () => {
        // login
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.getDataCyTest("post-title").contains("Quick question about").click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.contains("This question has been flagged").should("exist");
        cy.getDataCyTest("answer-page-flag").click();
        cy.contains("This question has been flagged").should("not.exist");
    });

    it("Moderator can see flagged posts", () => {
        // login
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("Profile").click();
        cy.contains("test question for flagging").should("exist");
    });

    it("Moderator can delete flagged posts from Moderation page", () => {
        // login
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("Profile").click();
        cy.contains("test question for flagging").should("exist");
        cy.getDataCyTest("delete-button").click();
        cy.contains("test question for flagging").should("not.exist");
    });

    it("Moderator can delete flagged posts from question detail page", () => {
        // login
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("Profile").click();
        cy.contains("test question for flagging").should("exist");
        cy.contains("test question for flagging").click();
        cy.getDataCyTest("answer-page-delete").click();
        cy.contains("test question for flagging").should("not.exist");
    });

    it("Only moderator can see the delete button in question detail page", () => {
        // login user
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("test question for flagging").click();
        cy.getDataCyTest("answer-page-delete").should("not.exist");
        // logout user
        cy.getDataCyTest("logOut").click();

        // login moderator
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("test question for flagging").click();
        cy.getDataCyTest("answer-page-delete").should("exist");
    });

    it("Only moderator can see the delete button in question detail page", () => {
        // login user
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("test question for flagging").click();
        cy.getDataCyTest("answer-page-delete").should("not.exist");
        // logout user
        cy.getDataCyTest("logOut").click();

        // login moderator
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("test question for flagging").click();
        cy.getDataCyTest("answer-page-delete").should("exist");
    });

    it("Flag all posts", () => {
        const modTitles = [
            "Programmatically navigate using React router",
            "android studio save string shared preference, start activity and load the saved string",
            "Object storage for a web application",
            "Quick question about storage on android",
            "test question for flagging",
        ];
        // login user
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.getDataCyTest("post-title").contains(qTitles[1]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        cy.getDataCyTest("post-title").contains(qTitles[2]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        cy.getDataCyTest("post-title").contains(qTitles[3]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        cy.getDataCyTest("post-title").contains(qTitles[4]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        // logout user
        cy.getDataCyTest("logOut").click();

        // login moderator
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("Profile").click();
        cy.get(".fso-moderator-link").each(($el, index) => {
            cy.wrap($el).should("contain.text", modTitles[index]);
        });
    });

    it("Delete all posts", () => {
        const modTitles = [
            "Programmatically navigate using React router",
            "android studio save string shared preference, start activity and load the saved string",
            "Object storage for a web application",
            "Quick question about storage on android",
            "test question for flagging",
        ];
        // login user
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.getDataCyTest("post-title").contains(qTitles[1]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        cy.getDataCyTest("post-title").contains(qTitles[2]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        cy.getDataCyTest("post-title").contains(qTitles[3]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        cy.getDataCyTest("post-title").contains(qTitles[4]).click();
        cy.getDataCyTest("answer-page-flag").click();
        cy.getDataCyTest("nav-question").click();
        // logout user
        cy.getDataCyTest("logOut").click();

        // login moderator
        cy.getDataCyTest("headerLogin").click();
        cy.getDataCyTest("loginEmail").type("m@moderator.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();

        cy.contains("Profile").click();
        cy.getDataCyTest("delete-button").each(($el, index) => {
            cy.wrap($el).click();
        });
        cy.contains("Questions").click();
        cy.contains("0 questions").should("exist");
    });
});

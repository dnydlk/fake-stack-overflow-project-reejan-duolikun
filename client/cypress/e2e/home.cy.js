// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

// cy.get('[data-cy-test="main-page-header"]').contains(/All Questions/i);
// cy.get('[data-cy-test="main-page-header"]').should("contain.text", "All Questions");

describe("Home Page Should load correctly", () => {
    beforeEach(() => {
        cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
        cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
        cy.visit("/home");
    });

    // Main - Content - Questions
    it("successfully shows all questions", () => {
        const qTitles = [
            "Quick question about storage on android",
            "Object storage for a web application",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];
        cy.getDataCyTest("post-title").each(($el, index) => {
            cy.wrap($el).should("contain.text", qTitles[index]);
        });
    });
    it("successfully shows all questions' answers count & view count", () => {
        const qAnswers = ["1 answer", "2 answers", "3 answers", "2 answers"];
        const qViews = ["103 views", "200 views", "121 views", "10 views"];
        cy.getDataCyTest("post-stats").each(($el, index) => {
            cy.wrap($el).should("contain.text", qAnswers[index]);
            cy.wrap($el).should("contain.text", qViews[index]);
        });
    });
    it("successfully shows all questions' authors & asked date", () => {
        const qAuthors = ["elephantCDE", "monkeyABC", "saltyPeter", "Joji John"];
        const qDates = [
            "asked Mar 10, 2023 at 14:28:01",
            "asked Feb 18, 2023 at 01:02:15",
            "asked Jan 10, 2023 at 11:24:30",
            "asked Jan 20, 2022 at 03:00:00",
        ];
        cy.getDataCyTest("last-activity").each(($el, index) => {
            cy.wrap($el).should("contain.text", qAuthors[index]);
            cy.wrap($el).should("contain.text", qDates[index]);
        });
    });
    it("successfully shows all questions' tags", () => {
        const qTags = [
            ["android-studio", "shared-preferences", "storage"],
            ["storage", "website"],
            ["android-studio", "shared-preferences", "javascript"],
            ["react", "javascript"],
        ];
        cy.getDataCyTest("question-tags").each(($el, index) => {
            cy.wrap($el).each(($tag, idx) => {
                cy.wrap($tag).should("contain.text", qTags[index][idx]);
            });
        });
    });
    it("successfully shows all questions in active order", () => {
        const qTitles = [
            "Programmatically navigate using React router",
            "android studio save string shared preference, start activity and load the saved string",
            "Quick question about storage on android",
            "Object storage for a web application",
        ];
        cy.getDataCyTest("order-btn-Active").click();
        cy.getDataCyTest("post-title").each(($el, index) => {
            cy.wrap($el).should("contain.text", qTitles[index]);
        });
    });
    it("successfully shows all questions in unanswered order", () => {
        cy.getDataCyTest("order-btn-Unanswered").click();
        cy.getDataCyTest("question-count").should("contain.text", "0 questions");
    });

    // Search
    it("Search for a question using text content that does not exist", () => {
        cy.getDataCyTest("search-bar").type("qwe").type("{enter}");
        cy.getDataCyTest("question-count").should("contain.text", "0 questions");
        cy.getDataCyTest("no-questions-found").should("contain.text", "No Questions Found");
    });
    it("Search for a question using test content that only exists in one question", () => {
        cy.getDataCyTest("search-bar").type("quick question").type("{enter}");
        cy.getDataCyTest("question-count").should("contain.text", "1 question");
        cy.getDataCyTest("post-title").should("contain.text", "Quick question about storage on android");
    });
    it("Search for a question using test content that exists in multiple questions", () => {
        cy.getDataCyTest("search-bar").type("storage").type("{enter}");
        cy.getDataCyTest("question-count").should("contain.text", "2 questions");
        cy.getDataCyTest("post-title").should("contain.text", "Quick question about storage on android");
        cy.getDataCyTest("post-title").should("contain.text", "Object storage for a web application");
    });
    it("Search for a question using tag that matches one question", () => {
        cy.getDataCyTest("search-bar").type("android-studio").type("{enter}");
        cy.getDataCyTest("question-count").should("contain.text", "2 questions");
        cy.getDataCyTest("post-title").should("contain.text", "Quick question about storage on android");
        cy.getDataCyTest("post-title").should(
            "contain.text",
            "android studio save string shared preference, start activity and load the saved string"
        );
    });
    // Add Question & Answer
    it("Add a new question", () => {
        const qTitles = [
            "New Question Title",
            "Quick question about storage on android",
            "Object storage for a web application",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];
        cy.getDataCyTest("ask-question-btn").click();
        cy.getDataCyTest("loginEmail").type("test@test.com");
        cy.getDataCyTest("loginPassword").type("q1234567");
        cy.getDataCyTest("loginBtn").click();
        cy.getDataCyTest("ask-question-btn").click();
        cy.get("#formTitleInput").type("New Question Title");
        cy.get("#formTextInput").type("New Question Body");
        cy.get("#formTagInput").type("tag1, tag2, tag3");
        cy.get("#formUsernameInput").type("testUser");
        cy.getDataCyTest("fso-form-post-button").click();
        cy.getDataCyTest("post-title").each(($el, index) => {
            cy.wrap($el).should("contain.text", qTitles[index]);
        });
        
    });

    it("Add a new answer", () => {
        cy.getDataCyTest("post-title").contains("Quick question about storage on android").click();
        cy.getDataCyTest("answer-page-post-answer").click();
        cy.get("#answerUsernameInput").type("testUser");
        cy.get("#answerTextInput").type("New Answer Body");
        cy.getDataCyTest("answer-page-post-answer-button").click();
        cy.getDataCyTest("answer-page-answer").should("contain.text", "New Answer Body");
    })
});

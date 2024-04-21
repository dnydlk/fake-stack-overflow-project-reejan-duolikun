// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

describe("Home Page Should load correctly", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
		cy.visit("/home");
	});

	// Search
	it("Search for a question using text content that does not exist", () => {
		cy.getDataCyTest("search-bar").type("qwe").type("{enter}");
		cy.getDataCyTest("question-count").should("contain.text", "0 questions");
		cy.getDataCyTest("no-questions-found").should("contain.text", "No Questions Found");
	});
	it("Search for a question using test content that only exists in one question", () => {
		cy.getDataCyTest("search-bar").type("quick question").type("{enter}");
		cy.getDataCyTest("question-count").should("contain.text", "2 question");
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

});
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

	it("Voting test up-vote", () => {
		const qTitles = [
			"New Question Title",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("headerLogin").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.getDataCyTest("post-title").contains("Quick question about storage on android").click();
		cy.getDataCyTest("answer-page-up-vote-button").click();
		cy.getDataCyTest("answer-page-current-votes").should("contain.text", "5");
	});

	it("Voting test down-vote", () => {
		const qTitles = [
			"test question for flagging",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("headerLogin").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.getDataCyTest("post-title").contains("Quick question about storage on android").click();
		cy.getDataCyTest("answer-page-down-vote-button").click();
		cy.getDataCyTest("answer-page-current-votes").should("contain.text", "3");
	});
});

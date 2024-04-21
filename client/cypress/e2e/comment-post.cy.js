// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

describe("Home Page Should load correctly", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
		cy.visit("/home");
	});


	it("Unauthenticated user redirected to login page to post answer", () => {
		const qTitles = [
			"New Question Title",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("post-title").contains("Quick question about storage on android").click();
		cy.getDataCyTest("answer-page-post-answer").click();
		cy.contains("Login");
	});

	it("Add a new answer", () => {
		const qTitles = [
			"New Question Title",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("post-title").contains("Quick question about storage on android").click();
		cy.getDataCyTest("answer-page-post-answer").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.getDataCyTest("post-title").contains("Quick question about storage on android").click();
		cy.getDataCyTest("answer-page-post-answer").click();
		cy.window().then((win) => {
			win.document.getElementById('answerUsernameInput').value = 'testUser';
		});
		cy.get("#answerTextInput").type("New Answer Body");
		cy.getDataCyTest("answer-page-post-answer-button").click();
		cy.getDataCyTest("answer-page-answer").should("contain.text", "New Answer Body");
	});

});
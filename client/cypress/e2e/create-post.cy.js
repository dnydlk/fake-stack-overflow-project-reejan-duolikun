// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

describe("Home Page Should load correctly", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
		cy.visit("/home");
	});

	it("Unauthenticated user redirected to login page to post question", () => {
		cy.getDataCyTest("ask-question-btn").click();
		cy.contains("Login");
	});

	it("Missing mandatory field testing", () => {
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
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.getDataCyTest("fso-form-post-button").click();
		cy.contains("Title cannot be empty");
		cy.contains("Question text cannot be empty");
		cy.contains("Should have at least 1 tag");
	});

	it("Title length and text length requirements", () => {
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
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';

		});
		cy.get("#formTitleInput").type("New");
		cy.getDataCyTest("fso-form-post-button").click();
		cy.contains("Title must be at least 15 characters");
		cy.get("#formTitleInput").type("more than 100 more than 100 more than 100 more than 100 more than 100 more than 100more than 100 100 more than 100 more than 100100 more than 100 more than 100100 more than 100 more than 100");
		cy.getDataCyTest("fso-form-post-button").click();
		cy.contains("Title cannot be more than 100 characters");
		cy.get("#formTextInput").type("Atleast 220 characters");
		cy.getDataCyTest("fso-form-post-button").click();
		cy.contains("Question text must be at least 220 characters");
	});

	// Add Question/ creating post
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
		cy.get("#formTextInput").type("New Question Body New Question BodyNew Question BodyNew Question BodyNew Question BodyNew New Question BodyNew Question BodyNew Question BodyNew Question BodyNew Question BodyQuestion BodyNew New Question BodyNew Question BodyQuestion BodyNew Question BodyNew Question Body");
		cy.get("#formTagInput").type("tag1, tag2, tag3");
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.getDataCyTest("fso-form-post-button").click();
		cy.getDataCyTest("post-title").each(($el, index) => {
			cy.wrap($el).should("contain.text", qTitles[index]);
		});
	});


});
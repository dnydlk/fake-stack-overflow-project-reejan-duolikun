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
			"test question for flagging",
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

	it('Ask a Question with many tags', () => {
		const qTitles = [
			"New Question Title",
			"test question for flagging",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("ask-question-btn").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.contains('Ask a Question').click();
		cy.get('#formTitleInput').type('Test Question 1');
		cy.get("#formTextInput").type("New Question Body New Question BodyNew Question BodyNew Question BodyNew Question BodyNew New Question BodyNew Question BodyNew Question BodyNew Question BodyNew Question BodyQuestion BodyNew New Question BodyNew Question BodyQuestion BodyNew Question BodyNew Question Body");
		cy.get('#formTagInput').type('javascript t1 t2');
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.contains('Post Question').click();
		cy.contains('javascript');
		cy.contains('t1');
		cy.contains('t2');
	});

	it('Ask a Question with more than 5 tags shows error', () => {
		const qTitles = [
			"New Question Title",
			"test question for flagging",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("ask-question-btn").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.contains('Ask a Question').click();
		cy.get('#formTitleInput').type('Test Question 1');
		cy.get('#formTextInput').type('Test Question 1 Text');
		cy.get('#formTagInput').type('t1 t2 t3 t4 t5 t6');
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.contains('Post Question').click();
		cy.contains('Cannot have more than 5 tags');
	});

	it('Ask a Question with a long new tag', () => {
		const qTitles = [
			"New Question Title",
			"test question for flagging",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("ask-question-btn").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.contains('Ask a Question').click();
		cy.get('#formTitleInput').type('Test Question 1');
		cy.get('#formTextInput').type('Test Question 1 Text');
		cy.get('#formTagInput').type('t1 t2 t3 t3t4t5t6t7t8t9t3t4t5t6t7t8t9');
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.contains('Post Question').click();
		cy.contains('New tag length cannot be more than 20');
	});

	it('create a new question with a new tag and finds the question through tag', () => {
		const qTitles = [
			"New Question Title",
			"test question for flagging",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("ask-question-btn").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();

		// add a question with tags
		cy.contains('Ask a Question').click();
		cy.get('#formTitleInput').type('Test Question A');
		cy.get("#formTextInput").type("New Question Body New Question BodyNew Question BodyNew Question BodyNew Question BodyNew New Question BodyNew Question BodyNew Question BodyNew Question BodyNew Question BodyQuestion BodyNew New Question BodyNew Question BodyQuestion BodyNew Question BodyNew Question Body");
		cy.get('#formTagInput').type('test1-tag1 react');
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.contains('Post Question').click();

		// clicks tags
		cy.contains('Tags').click();
		cy.contains('test1-tag1').click();
		cy.contains('1 questions');
		cy.contains('Test Question A');

		cy.contains('Tags').click();
		cy.contains('react').click();
		cy.contains('3 questions');
		cy.contains('Test Question A');
		cy.contains('Programmatically navigate using React router');
	});

	it('Ask a Question creates and accepts only 1 tag for all the repeated tags', () => {
		const qTitles = [
			"New Question Title",
			"test question for flagging",
			"Quick question about storage on android",
			"Object storage for a web application",
			"android studio save string shared preference, start activity and load the saved string",
			"Programmatically navigate using React router",
		];
		cy.getDataCyTest("ask-question-btn").click();
		cy.getDataCyTest("loginEmail").type("test@test.com");
		cy.getDataCyTest("loginPassword").type("q1234567");
		cy.getDataCyTest("loginBtn").click();

		cy.contains('Ask a Question').click();
		cy.get('#formTitleInput').type('Test Question 1');
		cy.get("#formTextInput").type("New Question Body New Question BodyNew Question BodyNew Question BodyNew Question BodyNew New Question BodyNew Question BodyNew Question BodyNew Question BodyNew Question BodyQuestion BodyNew New Question BodyNew Question BodyQuestion BodyNew Question BodyNew Question Body");
		cy.get('#formTagInput').type('test-tag test-tag test-tag');
		cy.window().then((win) => {
			win.document.getElementById('formUsernameInput').value = 'newTestUser';
		});
		cy.contains('Post Question').click();
		cy.contains('test-tag').should('have.length', 1);
		cy.contains('Tags').click();
		cy.contains('5 Tags');
		cy.contains('test-tag').click();
		cy.contains('1 questions');
	});

});
// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

describe("Profile page Should load correctly", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
		cy.visit("/login");
	});
	it("Profile page verification", () => {
		cy.get('#email').type("test@test.com");
		cy.get('#password').type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.get("#logOut").should('exist');
		cy.contains('Profile');
		cy.getDataCyTest("nav-profile").click();
		cy.getDataCyTest("activities").should('exist');
		cy.contains("Display Name");
		cy.getDataCyTest("displayname").should('have.value', "testUser1");
		cy.contains("Location");
		cy.getDataCyTest("location").should('have.value', "Location not provided");
		cy.contains("Title");
		cy.getDataCyTest("title").should('have.value', "Title not provided");
		cy.contains("About Me");
		cy.getDataCyTest("about-me").should('have.value', "About me not provided");
		cy.contains("Link");
		cy.getDataCyTest("link").should('have.value', "Link not provided");
		cy.contains("Update Profile");
	});
	it("Update Profile page test", () => {
		cy.get('#email').type("test@test.com");
		cy.get('#password').type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.getDataCyTest("nav-profile").click();
		cy.get("#location").type(" - new location");
		cy.get("#title").type(" - new title");
		cy.get("#about-me").type(" - updated about me");
		cy.get("#link").type(" - new link");
		cy.getDataCyTest("update-profile-button").click();
		cy.getDataCyTest("nav-question").click();
		cy.getDataCyTest("nav-profile").click();
		cy.getDataCyTest("location").should('have.value', "Location not provided - new location");
		cy.getDataCyTest("title").should('have.value', "Title not provided - new title");
		cy.getDataCyTest("about-me").should('have.value', "About me not provided - updated about me");
		cy.getDataCyTest("link").should('have.value', "Link not provided - new link");
	});
	it("Profile page loads correctly", () => {
		const qTitles = [
			"test question for flagging"
		];
		cy.get('#email').type("test@test.com");
		cy.get('#password').type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.get("#logOut").should('exist');
		cy.contains('Profile');
		cy.getDataCyTest("nav-profile").click();
		cy.getDataCyTest("activities").click();
		cy.contains("Your Activities");
		cy.contains("Question:");
		cy.getDataCyTest("post-title").each(($el, index) => {
			cy.wrap($el).should("contain.text", qTitles[index]);
		});
		cy.contains("Answer:");
		cy.getDataCyTest("answer-page-answer-text").contains("test answer for testing");
		cy.contains("Vote:");
		cy.getDataCyTest("answer-page-current-votes").contains("1");
	});

	it("Post answer and see if it updates in activities", () => {
		const qTitles = [
			"test question for flagging"
		];
		cy.get('#email').type("test@test.com");
		cy.get('#password').type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.get("#logOut").should('exist');
		cy.contains('Profile');
		cy.getDataCyTest("nav-profile").click();
		cy.getDataCyTest("activities").click();
		cy.contains("Your Activities");
		cy.contains("Question:");
		cy.getDataCyTest("post-title").each(($el, index) => {
			cy.wrap($el).should("contain.text", qTitles[index]);
		});
		cy.contains("Answer:");
		cy.getDataCyTest("answer-page-answer-text").contains("test answer for testing");
		cy.contains("Vote:");
		cy.getDataCyTest("answer-page-current-votes").contains("1");

		// Posting a comment
		cy.getDataCyTest("post-title").contains("test question for flagging").click();
		cy.getDataCyTest("answer-page-post-answer").click();
		cy.get("#answerTextInput").type("New Answer Body testing again");
		cy.getDataCyTest("answer-page-post-answer-button").click();
		cy.getDataCyTest("answer-page-answer").should("contain.text", "New Answer Body testing again");
		cy.getDataCyTest("nav-profile").click();
		cy.getDataCyTest("activities").click();
		cy.contains("Your Activities");
		cy.getDataCyTest("answer-page-answer").should("contain.text", "New Answer Body testing again");

	});

});

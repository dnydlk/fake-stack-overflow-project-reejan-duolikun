// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

// cy.get('[data-cy-test="main-page-header"]').contains(/All Questions/i);
// cy.get('[data-cy-test="main-page-header"]').should("contain.text", "All Questions");

describe("View Posts", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
		cy.visit("/home");
	});

	it("successfully shows all questions", () => {
		const qTitles = [
			"test question for flagging",
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
		const qAnswers = ["0 answer", "1 answer", "2 answers", "3 answers", "2 answers"];
		const qViews = ["5 views", "103 views", "200 views", "121 views", "10 views"];
		cy.getDataCyTest("post-stats").each(($el, index) => {
			cy.wrap($el).should("contain.text", qAnswers[index]);
			cy.wrap($el).should("contain.text", qViews[index]);
		});
	});
	it("successfully shows all questions' authors & asked date", () => {
		const qAuthors = ["testUser1", "elephantCDE", "monkeyABC", "saltyPeter", "JojiJohn"];
		const qDates = [
			"asked Apr 10 at 14:28:01",
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
			["react", "javascript"],
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
			"test question for flagging"
		];
		cy.getDataCyTest("order-btn-Active").click();
		cy.getDataCyTest("post-title").each(($el, index) => {
			cy.wrap($el).should("contain.text", qTitles[index]);
		});
	});
	it("successfully shows all questions in unanswered order", () => {
		cy.getDataCyTest("order-btn-Unanswered").click();
		cy.getDataCyTest("question-count").should("contain.text", "1 questions");
	});
});

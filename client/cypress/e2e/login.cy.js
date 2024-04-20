// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

describe("Login Page Should load correctly", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
		cy.visit("/");
	});

	it("Load login page with all elements", () => {
		cy.getDataCyTest("headerLogin").click();
		cy.get('#email').should('exist');
		cy.get('#password').should('exist');
		cy.getDataCyTest("loginBtn").should('exist');
		cy.getDataCyTest("signUpLink").should('exist');
		cy.contains("Don't have an account?");

	});

	it("Successful LogIn", () => {
		cy.visit("/login");
		cy.get('#email').type("test@test.com");
		cy.get('#password').type("q1234567");
		cy.getDataCyTest("loginBtn").click();
		cy.get("#logOut").should('exist');
	});
});
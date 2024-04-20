// baseUrl is set to "http://localhost:3000" in cypress.config.js
// function getDataCyTest(selector) defined in cypress/support/commands.js

describe("SignUp Page Should load correctly", () => {
	beforeEach(() => {
		cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
		cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
	});

	it("Load login page with all elements", () => {
		cy.visit("/");
		cy.getDataCyTest("headerLogin").click();
		cy.get('#email').should('exist');
		cy.get('#password').should('exist');
		cy.getDataCyTest("loginBtn").should('exist');
		cy.getDataCyTest("signUpLink").should('exist');
		cy.contains("Don't have an account?");

	});

	it("Clicking Signup here Link loads Signup page Succefully", () => {
		cy.visit("/login");
		cy.getDataCyTest("signUpLink").click();
		cy.contains("Sign Up");
	});

	it("Sign up loads with all elements", () => {
		cy.visit("/signup");
		cy.getDataCyTest("logo").should('exist');
		cy.get('#email').should('exist');
		cy.get('#password').should('exist');
		cy.get('#confirmPassword').should('exist');
		cy.get('#userName').should('exist');
		cy.getDataCyTest("signUpBtn").should('exist');
		cy.getDataCyTest("login-link").should('exist');
	});

	it("Sign up Sucessful account creation", () => {
		cy.visit("/signup");
		cy.get('#email').type("user1@test.com");
		cy.get('#password').type("q12345678");
		cy.get('#confirmPassword').type("q12345678");
		cy.get('#userName').type("user1");
		cy.getDataCyTest("signUpBtn").click();
		cy.wait(1000);
		cy.contains('Signup successful! Redirecting to the login page...');
		// cy.get("#logOut").should('exist');
	});

	it("Existing Email testing for Signup", () => {
		cy.visit("/signup");
		cy.get('#email').type("test@test.com");
		cy.get('#password').type("q1234567");
		cy.get('#confirmPassword').type("q1234567");
		cy.getDataCyTest("signUpBtn").click();
		cy.contains('This email is already registered. Please try logging in instead.');
	});

	it("Invalid email format testing for Signup", () => {
		cy.visit("/signup");
		cy.get('#email').type("test@testcom");
		cy.get('#password').type("q1234567");
		cy.get('#confirmPassword').type("q1234567");
		cy.getDataCyTest("signUpBtn").click();
		cy.contains('Invalid email address');
	});

	it("Minimum password requirement testing", () => {
		cy.visit("/signup");
		cy.get('#email').type("test1@test.com");
		cy.get('#password').type("q123");
		cy.get('#confirmPassword').type("q123");
		cy.getDataCyTest("signUpBtn").click();
		cy.contains('Password must contain at least eight characters, including at least one letter and one number.');
	});

	it("Incomplete Registration form - missing email", () => {
		cy.visit("/signup");
		cy.get('#password').type("q1234567");
		cy.get('#confirmPassword').type("q1234567");
		cy.getDataCyTest("signUpBtn").click();
		cy.contains('Please provide both email and password');
	});

	it("Incomplete Registration form - missing password", () => {
		cy.visit("/signup");
		cy.get('#email').type("test1@test.com");
		cy.getDataCyTest("signUpBtn").click();
		cy.contains('Please provide both email and password');
	});

	it("Incomplete Registration form - password and confirm password mismatch", () => {
		cy.visit("/signup");
		cy.get('#email').type("test1@test.com");
		cy.get('#password').type("q1234567");
		cy.get('#confirmPassword').type("q1234568");
		cy.getDataCyTest("signUpBtn").click();
		cy.contains('Passwords do not match');
	});

});
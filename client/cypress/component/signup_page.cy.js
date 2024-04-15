import { MemoryRouter } from "react-router-dom";
import Signup from "../../src/components/signUpPage";
import { registerUser } from "../../src/services/userService";

describe("<Signup />", () => {

  it("displays the Sign up form correctly", () => {

    cy.mount(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
    );
    // Check if the login form is displayed
    cy.getDateCyTest("signup-container").should("exist");

    // Check if the email input field is present
    cy.getDateCyTest("signUpEmail").should("exist").should("have.attr", "type", "email");

    // Check if the password input field is present
    cy.getDateCyTest("signUpPassword").should("exist").should("have.attr", "type", "password");

    // Check if the confirm password input field is present
    cy.getDateCyTest("signUpConfirmPwd").should("exist").should("have.attr", "type", "password");

    // Check if the login button is present
    cy.getDateCyTest("signUpBtn").should("exist").should("contain", "Sign Up");

    // Check if the signup link is present
    cy.getDateCyTest("login-link").should("exist").should("contain", "Login here");
  });

  it("displays error message when no email or password provided", () => {
    cy.mount(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
    );
    // Click on the login button without providing email and password
    cy.getDateCyTest("signUpBtn").click();

    // Check if the error message is displayed
    cy.getDateCyTest("errMsg").should("exist").should("contain", "Please provide both email and password");
  });
  
  it('registers a new user successfully', () => {
    // Stub the registerUser function to resolve with a successful response
    cy.stub(registerUser, 'callsFake').resolves({ status: 200 });

    mount(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    // Enter email and password
    cy.getDateCyTest('signUpEmail').type('test@example.com');
    cy.getDateCyTest('signUpPassword').type('password');
    cy.getDateCyTest('signUpConfirmPwd').type('password');

    // Click on the signup button
    cy.getDateCyTest('signUpBtn').click();

    // Check if the success message is displayed
    cy.getDateCyTest('successMsg').should('exist').should('contain', 'Signup successful! Redirecting to the login page...');

  });
});

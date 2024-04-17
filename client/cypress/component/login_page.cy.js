import Login from "../../src/components/loginPage";
import { AuthContext } from "../../src/components/authContext";
import { MemoryRouter } from "react-router-dom";

describe("<Login />", () => {

  it("displays the login form correctly", () => {

    const setToken = cy.stub();
    cy.mount(
      <AuthContext.Provider value={{ setToken }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // Check if the login form is displayed
    cy.getDateCyTest("login-container").should("exist");

    // Check if the email input field is present
    cy.getDateCyTest("loginEmail").should("exist").should("have.attr", "type", "email");

    // Check if the password input field is present
    cy.getDateCyTest("loginPassword").should("exist").should("have.attr", "type", "password");

    // Check if the login button is present
    cy.getDateCyTest("loginBtn").should("exist").should("contain", "Login");

    // Check if the signup link is present
    cy.getDateCyTest("signUpLink").should("exist").should("contain", "Signup here");
  });

  it("displays error message when no email or password provided", () => {
    const setToken = cy.stub();
    cy.mount(
      <AuthContext.Provider value={{ setToken }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // Click on the login button without providing email and password
    cy.getDateCyTest("loginBtn").click();

    // Check if the error message is displayed
    cy.getDateCyTest("errMsg").should("exist").should("contain", "Please provide both email and password");
  });

  it("displays error message for invalid login", () => {
    const setToken = cy.stub();

    cy.mount(
      <AuthContext.Provider value={{ setToken }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Stub the login service to return an error
    cy.intercept("POST", "http://localhost:8000/user/login", {
      statusCode: 400,
      body: { message: "Login failed" }
    }).as("loginRequest");

    // Enter email and password
    cy.getDateCyTest("loginEmail").type("test@example.com");
    cy.getDateCyTest("loginPassword").type("password");

    // Click on the login button
    cy.getDateCyTest("loginBtn").click();

    // Wait for the login request to complete and check if error message is displayed
    //cy.wait("@loginRequest");
    cy.getDateCyTest("errMsg").should("exist").should("contain", "Login failed");
  });

});
import { MemoryRouter } from "react-router-dom";
import Signup from "../../src/components/signUpPage";
import { registerUser } from "../../src/services/userService";
import { AuthContext } from "../../src/authProvider";

describe("<Signup />", () => {
    it("displays the Sign up form correctly", () => {
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // Check if the logo is displayed
        cy.getDataCyTest("logo").should("exist");

        // Check if the login form is displayed
        cy.getDataCyTest("signup-container").should("exist");

        // Check if the email input field is present
        cy.getDataCyTest("signUpEmail").should("exist").should("have.attr", "type", "email");

        // Check if the password input field is present
        cy.getDataCyTest("signUpPassword").should("exist").should("have.attr", "type", "password");

        // Check if the confirm password input field is present
        cy.getDataCyTest("signUpConfirmPwd").should("exist").should("have.attr", "type", "password");

        // Check if the User Name input field is present
        cy.getDataCyTest("signUpUserName").should("exist").should("have.attr", "type", "text");

        // Check if the login button is present
        cy.getDataCyTest("signUpBtn").should("exist").should("contain", "Sign Up");

        // Check if the signup link is present
        cy.getDataCyTest("login-link").should("exist").should("contain", "Login here");
    });

    it("displays error message when no email or password provided", () => {
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // No email or password provided
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("errMsg").should("exist").should("contain", "Please provide both email and password");

        // Only email provided
        cy.getDataCyTest("signUpEmail").type("test@test.com");
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("errMsg").should("exist").should("contain", "Please provide both email and password");

        // Only password provided
        cy.getDataCyTest("signUpEmail").clear();
        cy.getDataCyTest("signUpPassword").type("password123");
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("errMsg").should("exist").should("contain", "Please provide both email and password");
        cy.contains("Invalid email address").should("exist");
    });

    it("displays error message for invalid email", () => {
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        cy.getDataCyTest("signUpEmail").type("test");
        cy.contains("Invalid email address").should("exist");
    });

    it("displays error message for invalid password", () => {
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        cy.getDataCyTest("signUpEmail").type("test@test.com");
        cy.getDataCyTest("signUpPassword").type("password");
        cy.contains(
            "Password must contain at least eight characters, including at least one letter and one number."
        ).should("exist");
    });

    it("displays error message for inconsistent password", () => {
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        cy.getDataCyTest("signUpEmail").type("test@test.com");
        cy.getDataCyTest("signUpPassword").type("password123");
        cy.getDataCyTest("signUpConfirmPwd").type("password1234");
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("errMsg").contains("Passwords do not match").should("exist");
    });

    it("display email already registered", () => {
        cy.intercept("POST", "http://localhost:8000/user/register", (req) => {
            req.reply({
                statusCode: 400,
                body: {
                    status: "failed",
                    message: "This email is already registered. Please try logging in instead.",
                },
            });
        });
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        cy.getDataCyTest("signUpEmail").type("test@example.com");
        cy.getDataCyTest("signUpPassword").type("password123");
        cy.getDataCyTest("signUpConfirmPwd").type("password123");
        cy.getDataCyTest("signUpUserName").type("testUser");
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("errMsg").should(
            "contain",
            "This email is already registered. Please try logging in instead."
        );
    });

    it("display username already registered", () => {
        cy.intercept("POST", "http://localhost:8000/user/register", (req) => {
            req.reply({
                statusCode: 400,
                body: {
                    status: "failed",
                    message: "This username is already taken. Please try another one.",
                },
            });
        });
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        cy.getDataCyTest("signUpEmail").type("test@example.com");
        cy.getDataCyTest("signUpPassword").type("password123");
        cy.getDataCyTest("signUpConfirmPwd").type("password123");
        cy.getDataCyTest("signUpUserName").type("testUser");
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("errMsg").should("contain", "This username is already taken. Please try another one.");
    });

    it("display success registered", () => {
        cy.intercept("POST", "http://localhost:8000/user/register", (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    status: "failed",
                    message: "This username is already taken. Please try another one.",
                },
            });
        });
        cy.intercept("GET", "http://localhost:8000/user/validate-token", (req) => {
            req.reply({
                statusCode: 200,
                body: { authenticated: true },
            });
        });
        const setIsTokenValid = cy.stub();
        cy.mount(
            <AuthContext.Provider value={{ setIsTokenValid }}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        cy.getDataCyTest("signUpEmail").type("test@example.com");
        cy.getDataCyTest("signUpPassword").type("password123");
        cy.getDataCyTest("signUpConfirmPwd").type("password123");
        cy.getDataCyTest("signUpUserName").type("testUser");
        cy.getDataCyTest("signUpBtn").click();
        cy.getDataCyTest("success-message").should("contain", "Signup successful! Redirecting to the login page...");
    });
});

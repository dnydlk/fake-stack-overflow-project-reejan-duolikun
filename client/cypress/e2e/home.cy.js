describe("Home Page 1", () => {
    beforeEach(() => { 
        cy.visit("/");
    
    })
    it("successfully shows All Questions string", () => {
        // baseUrl is set to "http://localhost:3000" in cypress.config.js
        // cy.visit("/"); // moved to beforeEach
        // cy.contains("All Questions");
        // cy.get('[data-cy-test="main-page-header"]').contains(/All Questions/i);
        // cy.get('[data-cy-test="main-page-header"]').should("contain.text", "All Questions");
        cy.getDateCyTest("main-page-header").should("contain.text", "All Questions");
    });
});

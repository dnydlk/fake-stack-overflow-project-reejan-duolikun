// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//* Custom command to get an element by data-cy-test attribute
//* getDateCyTest: name of the custom command
//* dateCyTestSelector: contains the value of the data-cy-test attribute in the element
//* Usage: cy.get('[data-cy-test="main-page-header"]')
Cypress.Commands.add('getDateCyTest', (dateCyTestSelector) => {
    return cy.get(`[data-cy-test=${dateCyTestSelector}]`);
 })
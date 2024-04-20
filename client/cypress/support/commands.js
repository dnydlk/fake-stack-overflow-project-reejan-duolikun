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

/**
 * Custom command to get an element by data-cy-test attribute
 * Used data-cy-test attributes to provide context to selectors and isolate them from CSS or JS changes.
 * https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
 * @param {string} dateCyTestSelector
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
 * @example cy.getDataCyTest('main-page-header')
 */
Cypress.Commands.add("getDataCyTest", (dateCyTestSelector) => {
    return cy.get(`[data-cy-test=${dateCyTestSelector}]`);
});

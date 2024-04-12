// function getDateCyTest(selector) defined in cypress/support/commands.js

import Header from "../../src/components/header";

describe("<Header />", () => {
  
  it("Header shows logo, search bar and user profile", () => {
    const setQuestionPageSpy = cy.spy().as("setQuestionPageSpy");
    const search = "";
    cy.mount(<Header search={search} setQuestionPage={setQuestionPageSpy} />);
    cy.getDateCyTest("logo").should("exist");
    cy.getDateCyTest("search-bar").should("exist");
    cy.getDateCyTest("user-profile").should("exist");
  });

  it.only("Search bar shows search text entered by user", () => { 
    const setQuestionPageSpy = cy.spy().as("setQuestionPageSpy");
    const search = "test";
    cy.mount(<Header search={search} setQuestionPage={setQuestionPageSpy} />);
    cy.getDateCyTest("search-bar").should("have.value", search);
  })

  it("setQuestionPage called when enter is pressed in search", () => {
    const setQuestionPageSpy = cy.spy().as("setQuestionPageSpy");
    const search = "";
    cy.mount(<Header search={search} setQuestionPage={setQuestionPageSpy} />);
    cy.getDateCyTest("search-bar").type("test").type("{enter}");
    cy.get("@setQuestionPageSpy").should("have.been.calledWith", "test", "Search Results");
  });

});

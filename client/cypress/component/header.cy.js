// function getDataCyTest(selector) defined in cypress/support/commands.js

import Header from "../../src/components/header";
import { AuthContext } from "../../src/components/authContext";
import { MemoryRouter } from "react-router-dom";

describe("<Header />", () => {
  
  it("Header shows logo, search bar and user profile", () => {
    const setQuestionPageSpy = cy.spy().as("setQuestionPageSpy");
    const search = "";
    // Provide mocked context values
    const token = 'fakeToken';
    const setToken = cy.stub();
    cy.mount(
      <AuthContext.Provider value={{ token, setToken }}>
        <MemoryRouter>
          <Header search={search} setQuestionPage={setQuestionPageSpy} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    cy.getDataCyTest("logo").should("exist");
    cy.getDataCyTest("search-bar").should("exist");
    cy.getDataCyTest("user-profile").should("exist");
  });

  it.only("Search bar shows search text entered by user", () => { 
    const setQuestionPageSpy = cy.spy().as("setQuestionPageSpy");
    const search = "test";
    // Provide mocked context values
    const token = 'fakeToken';
    const setToken = cy.stub();
    cy.mount(
      <AuthContext.Provider value={{ token, setToken }}>
        <MemoryRouter>
          <Header search={search} setQuestionPage={setQuestionPageSpy} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    cy.getDataCyTest("search-bar").should("have.value", search);
  })

  it("setQuestionPage called when enter is pressed in search", () => {
    const setQuestionPageSpy = cy.spy().as("setQuestionPageSpy");
    const search = "";
    cy.mount(
      <AuthContext.Provider value={{ token, setToken }}>
        <MemoryRouter>
          <Header search={search} setQuestionPage={setQuestionPageSpy} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    cy.getDataCyTest("search-bar").type("test").type("{enter}");
    cy.get("@setQuestionPageSpy").should("have.been.calledWith", "test", "Search Results");
  });

});

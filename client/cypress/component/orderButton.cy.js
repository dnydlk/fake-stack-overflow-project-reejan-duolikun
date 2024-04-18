// function getDataCyTest(selector) defined in cypress/support/commands.js

import OrderButton from "../../src/components/main/questionPage/header/orderButton";

describe("<OrderButton />", () => { 
  it("OrderButton shows Newest button", () => { 
    const message = "Newest";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    cy.mount(<OrderButton message={message} setQuestionOrder={setQuestionOrderSpy} />);
    cy.getDataCyTest("order-btn-Newest").should("contain.text", "Newest");
  })

  it("OrderButton shows Active button", () => { 
    const message = "Active";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    cy.mount(<OrderButton message={message} setQuestionOrder={setQuestionOrderSpy} />);
    cy.getDataCyTest("order-btn-Active").should("contain.text", "Active");
  })

  it("OrderButton shows Unanswered button", () => { 
    const message = "Unanswered";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    cy.mount(<OrderButton message={message} setQuestionOrder={setQuestionOrderSpy} />);
    cy.getDataCyTest("order-btn-Unanswered").should("contain.text", "Unanswered");
  })

  it("setQuestionOrder called when Newest button is clicked", () => { 
    const message = "Newest";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    cy.mount(<OrderButton message={message} setQuestionOrder={setQuestionOrderSpy} />);
    cy.getDataCyTest("order-btn-Newest").click();
    cy.get("@setQuestionOrderSpy").should("have.been.called");
  })

  it("setQuestionOrder called when Active button is clicked", () => { 
    const message = "Active";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    cy.mount(<OrderButton message={message} setQuestionOrder={setQuestionOrderSpy} />);
    cy.getDataCyTest("order-btn-Active").click();
    cy.get("@setQuestionOrderSpy").should("have.been.called");
  })

  it("setQuestionOrder called when Unanswered button is clicked", () => { 
    const message = "Unanswered";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    cy.mount(<OrderButton message={message} setQuestionOrder={setQuestionOrderSpy} />);
    cy.getDataCyTest("order-btn-Unanswered").click();
    cy.get("@setQuestionOrderSpy").should("have.been.called");
  })
})
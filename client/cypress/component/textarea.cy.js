// function getDateCyTest(selector) defined in cypress/support/commands.js
import Textarea from "../../src/components/main/baseComponents/textarea";

describe("<Textarea />", () => { 
  it("Textarea shows title correctly", () => { 
    const title = "Question Text";
    const hint = "Add details";
    const val = "";
    const setState = cy.spy().as("setState");
    const err = "Text cannot be empty";
    
    cy.mount(<Textarea title={title} hint={hint} val={val} setState={setState} err={err} />);
    cy.getDateCyTest("fso-input-title").should("contain.text", title);
  })

  it("Textarea shows hint correctly", () => { 
    const title = "Question Text";
    const hint = "Add details";
    const val = "";
    const setState = cy.spy().as("setState");
    const err = "Text cannot be empty";
    
    cy.mount(<Textarea title={title} hint={hint} val={val} setState={setState} err={err} />);
    cy.getDateCyTest("fso-input-hint").should("contain.text", hint);
  })

  it("Textarea shows error correctly", () => { 
    const title = "Question Text";
    const hint = "Add details";
    const val = "";
    const setState = cy.spy().as("setState");
    const err = "Text cannot be empty";
    
    cy.mount(<Textarea title={title} hint={hint} val={val} setState={setState} err={err} />);
    cy.getDateCyTest("fso-input-error").should("contain.text", err);
  })

  it("Textarea calls setState correctly", () => { 
    const title = "Question Text";
    const hint = "Add details";
    const val = "";
    const setState = cy.spy().as("setState");
    const err = "Text cannot be empty";
    
    cy.mount(<Textarea title={title} hint={hint} val={val} setState={setState} err={err} />);
    cy.get("textarea").type("t").then(() => { 
      expect(setState).to.be.calledWith("t");;
    })
  })
})
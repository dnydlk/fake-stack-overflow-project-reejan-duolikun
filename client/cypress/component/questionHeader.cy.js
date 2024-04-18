// function getDataCyTest(selector) defined in cypress/support/commands.js

import QuestionHeader from "../../src/components/main/questionPage/header";

describe("<QuestionHeader />", () => { 
  it("QuestionHeader shows title correctly", () => { 
    const title_text = "test title text";
    const qcnt = 0;
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
    cy.mount(<QuestionHeader title_text={title_text} qcnt={qcnt} setQuestionOrder={setQuestionOrderSpy} handleNewQuestion={handleNewQuestionSpy} />);
    cy.getDataCyTest("main-page-header").should("contain.text", title_text);
  })

  it("QuestionHeader shows Ask a Question button", () => { 
    const title_text = "test title text";
    const qcnt = 0;
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
    cy.mount(<QuestionHeader title_text={title_text} qcnt={qcnt} setQuestionOrder={setQuestionOrderSpy} handleNewQuestion={handleNewQuestionSpy} />);
    cy.getDataCyTest("ask-question-btn").should("contain.text", "Ask a Question");
  })

  it("QuestionHeader shows question count", () => { 
    const title_text = "test title text";
    const qcnt = 1;
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
    cy.mount(<QuestionHeader title_text={title_text} qcnt={qcnt} setQuestionOrder={setQuestionOrderSpy} handleNewQuestion={handleNewQuestionSpy} />);
    cy.getDataCyTest("question-count").should("contain.text", "1 questions");
  })
})
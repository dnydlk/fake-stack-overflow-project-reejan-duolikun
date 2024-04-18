// function getDataCyTest(selector) defined in cypress/support/commands.js

import QuestionPage from "../../src/components/main/questionPage";

describe("<QuestionPage />", () => { 
  it("QuestionPage renders correctly", () => {
    const title_text = "All Questions";
    const order = "newest";
    const search = "";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    const clickTagSpy = cy.spy().as("clickTagSpy");
    const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
    const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
    const qlist = [
      {
        title: "Test Question 1",
        tags: [{ name: "tag1" }, { name: "tag2" }],
        answers: [],
        views: 0,
        asked_by: "Test User 1",
        ask_date_time: new Date(),
      },
      {
        title: "Test Question 2",
        tags: [{ name: "tag3" }, { name: "tag4" }],
        answers: [],
        views: 0,
        asked_by: "Test User 2",
        ask_date_time: new Date(),
      },
    ];
    cy.intercept("GET", "http://localhost:8000/question/getQuestion?order=newest&search=", qlist).as(
      "getQuestionsByFilter"
    );
    cy.mount(
      <QuestionPage
        title_text={title_text}
        order={order}
        search={search}
        setQuestionOrder={setQuestionOrderSpy}
        clickTag={clickTagSpy}
        handleAnswer={handleAnswerSpy}
        handleNewQuestion={handleNewQuestionSpy}
      />
    );
    cy.getDataCyTest("question-list").within(() => { 
      cy.getDataCyTest("question").should("have.length", qlist.length);
    })
  });

  it("QuestionPage shows no questions found", () => { 
    const title_text = "Search Results";
    const order = "newest";
    const search = "test";
    const setQuestionOrderSpy = cy.spy().as("setQuestionOrderSpy");
    const clickTagSpy = cy.spy().as("clickTagSpy");
    const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
    const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
    cy.intercept("GET", "http://localhost:8000/question/getQuestion?order=newest&search=test", []).as(
      "getQuestionsByFilter"
    );
    cy.mount(
      <QuestionPage
        title_text={title_text}
        order={order}
        search={search}
        setQuestionOrder={setQuestionOrderSpy}
        clickTag={clickTagSpy}
        handleAnswer={handleAnswerSpy}
        handleNewQuestion={handleNewQuestionSpy}
      />
    );
    cy.getDataCyTest("no-questions-found").should("exist");
  })
})
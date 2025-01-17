// function getDataCyTest(selector) defined in cypress/support/commands.js

import Main from "../../src/components/main";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Main />", () => {
    it("Main shows title correctly", () => {
        const search = "";
        const title = "All Questions";
        const setQuestionPage = cy.spy().as("setQuestionPage");

        cy.mount(
            <Router>
                <Main title={title} search={search} setQuestionPage={setQuestionPage} />{" "}
            </Router>
        );
        cy.getDataCyTest("main-page-header").should("contain.text", title);
    });

    it("Main shows question count", () => {
        const search = "";
        const title = "All Questions";
        const setQuestionPage = cy.spy().as("setQuestionPage");
        cy.mount(
            <Router>
                <Main title={title} search={search} setQuestionPage={setQuestionPage} />{" "}
            </Router>
        );
        cy.getDataCyTest("question-count").should("contain.text", "0 questions");
    });

    it("Main shows filter buttons", () => {
        const search = "";
        const title = "All Questions";
        const setQuestionPage = cy.spy().as("setQuestionPage");
        cy.mount(
            <Router>
                <Main title={title} search={search} setQuestionPage={setQuestionPage} />{" "}
            </Router>
        );
        cy.getDataCyTest("order-btn-Newest").should("contain.text", "Newest");
        cy.getDataCyTest("order-btn-Active").should("contain.text", "Active");
        cy.getDataCyTest("order-btn-Unanswered").should("contain.text", "Unanswered");
    });
});

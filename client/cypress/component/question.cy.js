// function getDataCyTest(selector) defined in cypress/support/commands.js

import Question from "../../src/components/main/questionPage/question";

describe("<Question />", () => {
    it("Question shows post status", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [],
            views: 0,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("post-stats").should("contains.text", "answer");
        cy.getDataCyTest("post-stats").should("contains.text", "view");
    });

    it("Post status show answer & view as singular when there is 0 answer and 0 view", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [],
            views: 0,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("post-stats").should("have.text", "0 answer0 view");
    });

    it("Post status show answer & view as singular when there is 1 answer and 1 view", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [{}],
            views: 1,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("post-stats").should("have.text", "1 answer1 view");
    });

    it("Post status show answer as plural when there is more than 1 answer", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [{}, {}],
            views: 2,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("post-stats").should("have.text", "2 answers2 views");
    });

    it("Question shows title", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [],
            views: 0,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("post-title").should("contains.text", "Test Question");
    });

    it("Question shows tags", () => {
        const q = {
            title: "Test Question",
            tags: [{ name: "tag1" }, { name: "tag2" }],
            answers: [],
            views: 0,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("question-tags").should("contains.text", "tag1");
        cy.getDataCyTest("question-tags").should("contains.text", "tag2");
    });

    it("Question shows author", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [],
            views: 0,
            asked_by: { username: "Test User" },
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("last-activity").should("contains.text", "Test User");
    });

    it("Question shows asked date time", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [],
            views: 0,
            asked_by: "Test User",
            ask_date_time: new Date("2024-01-01T01:01:01"),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.getDataCyTest("last-activity").should("contains.text", "asked Jan 01 at 01:01:01");
    });

    it("handleAnswer is called when question is clicked", () => {
        const q = {
            title: "Test Question",
            tags: [],
            answers: [],
            views: 0,
            asked_by: "Test User",
            ask_date_time: new Date(),
        };
        const clickTagSpy = cy.spy().as("clickTagSpy");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(<Question q={q} clickTag={clickTagSpy} handleAnswer={handleAnswerSpy} />);
        cy.get(".fso-question").click();
        cy.get("@handleAnswerSpy").should("have.been.calledOnce");
    });
});

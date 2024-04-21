// function getDataCyTest(selector) defined in cypress/support/commands.js
import AnswerHeader from "../../src/components/main/answerPage/header";

describe("<AnswerHeader />", () => {
	const ansCount = 5;
    const title = "Test Title";
    const views = 7;
    const meta = "Test Meta";
    const question = {
        _id: "66254fa7dfdded16371bff65",
        title: "test question for flagging",
        text: "test question for flagging",
        tags: ["66254fa7dfdded16371bff1f", "66254fa7dfdded16371bff23"],
        answers: [
            {
                _id: "66254fa7dfdded16371bff5b",
                text: "test answer for testing",
                ans_by: {
                    _id: "66254fa7dfdded16371bff2f",
                    username: "testUser1",
                },
                ans_date_time: "2023-04-21T01:17:53.000Z",
                votes: ["66254fa7dfdded16371bff8f"],
                __v: 0,
            },
        ],
        asked_by: {
            _id: "66254fa7dfdded16371bff2f",
            username: "testUser1",
        },
        ask_date_time: "2024-04-10T18:28:01.000Z",
        views: 13,
        isFlagged: true,
        flaggedBy: "66254fa7dfdded16371bff2f",
        __v: 0,
    };
    it("AnswerHeader shows title correctly", () => {
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(
            <AnswerHeader
                ansCount={ansCount}
                title={title}
                handleNewQuestion={handleNewQuestionSpy}
                views={views}
                meta={meta}
                question={question}
            />
        );
        cy.getDataCyTest("answer-page-question-title").should("have.text", title);
    });

    it("AnswerHeader shows meta correctly", () => {
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(
            <AnswerHeader
                ansCount={ansCount}
                title={title}
                handleNewQuestion={handleNewQuestionSpy}
                views={views}
                meta={meta}
                question={question}
            />
        );
        cy.getDataCyTest("answer-page-question-meta").should("have.text", meta);
    });

    it("AnswerHeader shows views correctly", () => {
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(
            <AnswerHeader
                ansCount={ansCount}
                title={title}
                handleNewQuestion={handleNewQuestionSpy}
                views={views}
                meta={meta}
                question={question}
            />
        );
        cy.getDataCyTest("fso-answer-title-detail-text").should("have.text", `${views} times`);
    });

    it("AnswerHeader shows Ask a Question button", () => {
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(
            <AnswerHeader
                ansCount={ansCount}
                title={title}
                handleNewQuestion={handleNewQuestionSpy}
                views={views}
                meta={meta}
                question={question}
            />
        );
        cy.getDataCyTest("ask-question-btn").should("have.text", "Ask a Question");
    });

    it("AnswerHeader calls handleNewQuestion on Ask a Question button click", () => {
        const handleNewQuestionSpy = cy.spy().as("handleNewQuestionSpy");
        cy.mount(
            <AnswerHeader
                ansCount={ansCount}
                title={title}
                handleNewQuestion={handleNewQuestionSpy}
                views={views}
                meta={meta}
                question={question}
            />
        );
        cy.getDataCyTest("ask-question-btn").click();
        cy.get("@handleNewQuestionSpy").should("have.been.called");
    });
});

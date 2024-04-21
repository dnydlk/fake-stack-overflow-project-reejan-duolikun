// function getDataCyTest(selector) defined in cypress/support/commands.js
import Activities from "../../src/components/main/profilePage/activities";
import * as answerService from "../../src/services/answerService";
import Question from "../../src/components/main/questionPage/question";
import Answer from "../../src/components/main/answerPage/answer";

const currentUser = {
    _id: "66254fa7dfdded16371bff2f",
    email: "test@test.com",
    username: "testUser1",
    location: "Location not provided",
    title: "Title not provided",
    aboutMe: "About me not provided",
    link: "Link not provided",
    askedQuestion: [
        {
            _id: "66254fa7dfdded16371bff65",
            title: "test question for flagging",
            text: "test question for flagging",
            tags: [
                {
                    _id: "66254fa7dfdded16371bff1f",
                    name: "react",
                    __v: 0,
                },
                {
                    _id: "66254fa7dfdded16371bff23",
                    name: "javascript",
                    __v: 0,
                },
            ],
            answers: [
                {
                    _id: "66254fa7dfdded16371bff5b",
                    text: "test answer for testing",
                    ans_by: "66254fa7dfdded16371bff2f",
                    ans_date_time: "2023-04-21T01:17:53.000Z",
                    votes: ["66254fa7dfdded16371bff8f"],
                    __v: 0,
                },
            ],
            asked_by: "66254fa7dfdded16371bff2f",
            ask_date_time: "2024-04-10T18:28:01.000Z",
            views: 16,
            isFlagged: true,
            flaggedBy: "66254fa7dfdded16371bff2f",
            __v: 0,
        },
    ],
    answeredQuestion: [
        {
            _id: "66254fa7dfdded16371bff5b",
            text: "test answer for testing",
            ans_by: {
                _id: "66254fa7dfdded16371bff2f",
                email: "test@test.com",
                username: "testUser1",
                location: "Location not provided",
                title: "Title not provided",
                aboutMe: "About me not provided",
                link: "Link not provided",
                askedQuestion: ["66254fa7dfdded16371bff65"],
                answeredQuestion: ["66254fa7dfdded16371bff5b"],
                votedAnswer: ["66254fa7dfdded16371bff8f"],
                role: "user",
                __v: 0,
            },
            ans_date_time: "2023-04-21T01:17:53.000Z",
            votes: ["66254fa7dfdded16371bff8f"],
            __v: 0,
        },
    ],
    votedAnswer: [
        {
            _id: "66254fa7dfdded16371bff8f",
            user: "66254fa7dfdded16371bff2f",
            answer: "66254fa7dfdded16371bff5b",
            voteType: true,
            createdAt: "2024-04-21T17:40:55.958Z",
            updatedAt: "2024-04-21T17:40:55.958Z",
            __v: 0,
        },
    ],
    role: "user",
    __v: 0,
};

const mockVotedAnswers = [{ aid: "a1", content: "This is a voted answer." }];

describe("<Activities />", () => {
    beforeEach(() => {
        cy.intercept("GET", "http://localhost:8000/vote/current-vote?answerId=66254fa7dfdded16371bff5b", {
            statusCode: 200,
            body: { currentVotes: 1 },
        }).as("getAnswersByUserCall");
        cy.intercept("GET", "http://localhost:8000/answer/getAnswer/?userId=66254fa7dfdded16371bff2f", {
            statusCode: 200,
            body: [
                {
                    _id: "66254fa7dfdded16371bff5b",
                    text: "test answer for testing",
                    ans_by: "66254fa7dfdded16371bff2f",
                    ans_date_time: "2023-04-21T01:17:53.000Z",
                    votes: [
                        {
                            _id: "66254fa7dfdded16371bff8f",
                            user: "66254fa7dfdded16371bff2f",
                            answer: "66254fa7dfdded16371bff5b",
                            voteType: true,
                            createdAt: "2024-04-21T17:40:55.958Z",
                            updatedAt: "2024-04-21T17:40:55.958Z",
                            __v: 0,
                        },
                    ],
                    __v: 0,
                },
            ],
        }).as("getAnswer");
        cy.stub(answerService, "getAnswersByUser").resolves(mockVotedAnswers).as("getAnswersByUserCall");
        cy.mount(<Activities currentUser={currentUser} clickTag={cy.spy()} handleAnswer={cy.spy()} />);
    });

    it("displays the correct sections for questions, answers, and votes", () => {
        cy.contains("Question:").should("be.visible");
        cy.contains("Answer:").should("be.visible");
        cy.contains("Vote:").should("be.visible");
    });

    it("displays questions, answers, and votes", () => {
        cy.getDataCyTest("asked").should("have.length", 1);
        cy.getDataCyTest("answered").should("have.length", 1);
        cy.getDataCyTest("voted").should("have.length", 1);
    });

    it("displays no questions message when there are no questions", () => {
        cy.mount(
            <Activities
                currentUser={{ ...currentUser, askedQuestion: [] }}
                clickTag={cy.spy()}
                handleAnswer={cy.spy()}
            />
        );
        cy.contains("No Questions").should("be.visible");
    });

    it("displays no answers message when there are no answers", () => {
        cy.mount(
            <Activities
                currentUser={{ ...currentUser, answeredQuestion: [] }}
                clickTag={cy.spy()}
                handleAnswer={cy.spy()}
            />
        );
        cy.contains("No Answers").should("be.visible");
    });

    it("displays no votes message when there are no voted answers", () => {
        cy.mount(
            <Activities currentUser={{ ...currentUser, votedAnswer: [] }} clickTag={cy.spy()} handleAnswer={cy.spy()} />
        );
        cy.contains("No Votes").should("be.visible");
    });
});

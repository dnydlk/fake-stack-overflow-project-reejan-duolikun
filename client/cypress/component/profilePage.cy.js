// function getDataCyTest(selector) defined in cypress/support/commands.js
import ProfilePage from "../../src/components/main/profilePage";

const user = {
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
            asked_by: {
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
            answer: {
                _id: "66254fa7dfdded16371bff5b",
                text: "test answer for testing",
                ans_by: "66254fa7dfdded16371bff2f",
                ans_date_time: "2023-04-21T01:17:53.000Z",
                votes: ["66254fa7dfdded16371bff8f"],
                __v: 0,
            },
            voteType: true,
            createdAt: "2024-04-21T17:40:55.958Z",
            updatedAt: "2024-04-21T17:40:55.958Z",
            __v: 0,
        },
    ],
    role: "user",
    __v: 0,
};

describe("Profile Page", () => {
    it("should display profile page for user role", () => {
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(
            <ProfilePage
                currentUser={user}
                setCurrentUser={cy.stub()}
                clickTag={cy.stub()}
                handleAnswer={handleAnswerSpy}
            />
        );
        cy.contains("Your Profile").should("exist");
        cy.contains("Activities").should("exist");
    });

    it("should display activities page for user role", () => {
        cy.intercept("GET", "http://localhost:8000/user/get-user-info", {
            statusCode: 200,
            body: user,
        }).as("get-user-info");
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

        const setCurrentUserStub = cy.stub().as("setCurrentUserStub");
        const clickTagStub = cy.stub().as("clickTagStub");
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");

        cy.mount(
            <ProfilePage
                currentUser={user}
                setCurrentUser={setCurrentUserStub}
                clickTag={clickTagStub}
                handleAnswer={handleAnswerSpy}
            />
        );
        cy.contains("Your Profile").should("be.visible");
        cy.contains("Activities").should("be.visible");
        cy.get("button").contains("Activities").click();
        cy.wait("@get-user-info");
        cy.contains("Your Activities").should("be.visible");
    });
});

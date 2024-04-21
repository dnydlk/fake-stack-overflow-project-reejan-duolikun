// function getDataCyTest(selector) defined in cypress/support/commands.js
import Moderation from "../../src/components/main/profilePage/moderation";

const testFlaggedQuestions = [
    {
        _id: "66254fa7dfdded16371bff63",
        title: "Test Flagged Question 1",
        isFlagged: true,
        flaggedBy: {
            _id: "66254fa7dfdded16371bff31",
            username: "Flagger 1",
        },
    },
    {
        _id: "66254fa7dfdded16371bff65",
        title: "Test Flagged Question 2",
        isFlagged: true,
        flaggedBy: {
            username: "Flagger 2",
        },
    },
    {
        _id: "66254fa7dfdded16371bff66",
        title: "Test Flagged Question 3",
        isFlagged: true,
        flaggedBy: {
            username: "Flagger 3",
        },
    },
];

const testModerator = {
    _id: "66254fa7dfdded16371bff31",
    email: "m@moderator.com",
    username: "moderator",
    location: "Location not provided",
    title: "Title not provided",
    aboutMe: "About me not provided",
    link: "Link not provided",
    askedQuestion: [],
    answeredQuestion: [],
    votedAnswer: [],
    role: "moderator",
    __v: 0,
};

describe("Profile Page", () => {
    beforeEach(() => {
        cy.intercept("GET", "http://localhost:8000/question/getFlaggedQuestions", {
            statusCode: 200,
            body: testFlaggedQuestions,
        }).as("fetchFlaggedQuestions");
    });

    it("should display moderation page", () => {
        cy.mount(<Moderation currentUser={testModerator} flaggedQuestions={testFlaggedQuestions} />);
        cy.contains("Question:#Question LinkFlaggedByDelete").should("exist");
        cy.getDataCyTest("delete-button").should("exist");
    });

    it("should display correct number of flagged questions", () => {
        cy.mount(<Moderation currentUser={testModerator} flaggedQuestions={testFlaggedQuestions} />);
        cy.contains("Question:#Question LinkFlaggedByDelete").should("exist");
        cy.getDataCyTest("index").should("contain.text", "1");
        cy.getDataCyTest("index").should("contain.text", "2");
        cy.getDataCyTest("index").should("contain.text", "3");
    });

    it("calls handleAnswer on clicking a question title", () => {
        const handleAnswerSpy = cy.spy().as("handleAnswerSpy");
        cy.mount(
            <Moderation
                currentUser={testModerator}
                handleAnswer={handleAnswerSpy}
                flaggedQuestions={testFlaggedQuestions}
            />
        );
        cy.getDataCyTest("question-link").first().click();
        cy.get("@handleAnswerSpy").should("have.been.calledWith", testFlaggedQuestions[0]._id);
    });

    it("calls fetchFlaggedQuestions after a question is successfully deleted", () => {
        cy.mount(<Moderation currentUser={testModerator} flaggedQuestions={testFlaggedQuestions} />);
        cy.stub(window, "confirm").returns(true);
        cy.getDataCyTest("delete-button").first().click();
        cy.wait("@fetchFlaggedQuestions");
        cy.get("@fetchFlaggedQuestions").its("response.statusCode").should("equal", 200);
    });
});

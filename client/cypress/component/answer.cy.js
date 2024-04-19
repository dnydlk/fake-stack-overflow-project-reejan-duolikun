// function getDataCyTest(selector) defined in cypress/support/commands.js
import Answer from "../../src/components/main/answerPage/answer";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const getMetaData = (date) => {
    const now = new Date();
    const diffs = Math.floor(Math.abs(now - date) / 1000);

    if (diffs < 60) {
        return diffs + " seconds ago";
    } else if (diffs < 60 * 60) {
        return Math.floor(diffs / 60) + " minutes ago";
    } else if (diffs < 60 * 60 * 24) {
        let h = Math.floor(diffs / 3600);
        return h + " hours ago";
    } else if (diffs < 60 * 60 * 24 * 365) {
        return months[date.getMonth()] + " " + getDateHelper(date) + " at " + date.toTimeString().slice(0, 8);
    } else {
        return (
            months[date.getMonth()] +
            " " +
            getDateHelper(date) +
            ", " +
            date.getFullYear() +
            " at " +
            date.toTimeString().slice(0, 8)
        );
    }
};

const getDateHelper = (date) => {
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return day;
};

const testAnswer = {
    _id: "66220a7b7d06af88a828eec2",
    text: "test",
    ans_by: "user",
    ans_date_time: "2024-01-19T06:08:59.512Z",
    votes: ["66220a837d06af88a828eee1"],
};

describe("<Answer />", () => {
    it("Answer renders correctly", () => {
        cy.intercept("GET", `http://localhost:8000/vote/current-vote?answerId=${testAnswer._id}`, {
            currentVotes: 2
        });
        cy.mount(<Answer answer={testAnswer} />);
        cy.getDataCyTest("answer-page-up-vote-button").should("exist");
        cy.getDataCyTest("answer-page-down-vote-button").should("exist");
        cy.getDataCyTest("answer-page-current-votes").should("contain.text", "2");
        cy.getDataCyTest("answer-page-answer-text").should("contain.text", testAnswer.text);
        cy.getDataCyTest("answer-page-answer-by").should("contain.text", testAnswer.ans_by);
        cy.getDataCyTest("answer-page-answer-meta").should("contain.text", getMetaData(new Date(testAnswer.ans_date_time)));
        cy.pause();
    });
});

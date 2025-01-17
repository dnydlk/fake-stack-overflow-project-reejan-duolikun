// Unit tests for addAnswer in contoller/answer.js

const supertest = require("supertest");
const { default: mongoose } = require("mongoose");

const Answer = require("../../models/answers");
const Question = require("../../models/questions");
const User = require("../../models/user");

// Mock the Answer model
jest.mock("../../models/answers");

let server;
describe("POST /addAnswer", () => {
    beforeEach(() => {
        server = require("../../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should add a new answer to the question", async () => {
        // Mocking the request body
        const mockReqBody = {
            qid: "dummyQuestionId",
            ans: {
                text: "This is a test answer",
            },
        };

        const mockAnswer = {
            _id: "dummyAnswerId",
            text: "This is a test answer",
        };

        const mockUser = {
            _id: "dummyUserId",
            username: "rk111",
        };
        // Mock the create method of the Answer model
        Answer.create.mockResolvedValueOnce(mockAnswer);

        // Mocking the Question.findOneAndUpdate method
        Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            _id: "dummyQuestionId",
            answers: ["dummyAnswerId"],
        });

        User.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
            _id: "dummyUserId",
            answeredQuestion: ["dummyAnswerId"],
        });

        // Making the request
        const response = await supertest(server).post("/answer/addAnswer").send(mockReqBody);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAnswer);

        // Verifying that Answer.create method was called with the correct arguments
        expect(Answer.create).toHaveBeenCalledWith({
            text: "This is a test answer",
        });

        // Verifying that Question.findOneAndUpdate method was called with the correct arguments
        expect(Question.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "dummyQuestionId" },
            { $push: { answers: "dummyAnswerId" } }
        );
    });

    describe("GET /getAnswer", () => {
        it("should return answers by user", async () => {
            // Mock request query
            const reqQuery = {
                userId: "dummyUserId",
            };

            // Mock the find method of the Answer model
            const dummyAnswers = [
                { _id: "answer1Id", text: "Answer 1", ans_by: "dummyUserId", votes: [] },
                { _id: "answer2Id", text: "Answer 2", ans_by: "dummyUserId", votes: [] },
            ];
            //Answer.find.mockResolvedValueOnce(dummyAnswers);
            Answer.find.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValueOnce(dummyAnswers),
            });

            // Send request to the router
            const response = await supertest(server).get("/answer/getAnswer").query(reqQuery);

            // Assert response
            expect(response.status).toBe(200);
            expect(response.body).toEqual(dummyAnswers);
        });
    });
});

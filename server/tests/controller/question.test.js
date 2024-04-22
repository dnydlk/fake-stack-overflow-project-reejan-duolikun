const supertest = require("supertest");
const mongoose = require("mongoose");
const Question = require("../../models/questions");
const User = require("../../models/user");
const { verify } = require("jsonwebtoken");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require("../../utils/question");

jest.mock("../../models/questions");
jest.mock("../../models/user");
jest.mock("../../utils/question");
jest.mock("jsonwebtoken", () => ({
    verify: jest.fn().mockImplementation((token, secret) => {
        if (
            token ===
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI1YTIzZTEwMDMxNjRhNGI4MjE2NjAiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzEzNzUwNDk1fQ.S2ssKzKBghhP9-dm0n2grqd4riNAHI18Ji1KUNEhfNA" &&
            secret === "RANDOM-TOKEN"
        ) {
            return { id: "userid", role: "moderator" };
        } else {
            return { id: "userid", role: "user" };
        }
    }),
}));

let server;

beforeAll(() => {
    server = require("../../server");
});

afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});

describe("Questions API", () => {
    const mockPopulate = jest.fn().mockReturnThis();

    beforeEach(() => {
        mockPopulate.mockClear();
        Question.findOneAndUpdate.mockImplementation(() => ({
            populate: mockPopulate,
        }));
    });

    it("should return questions by filter", async () => {
        const mockReqQuery = { order: "someOrder", search: "someSearch" };
        const mockQuestions = [{ _id: "1", title: "Test Question" }];

        getQuestionsByOrder.mockResolvedValue(mockQuestions);
        filterQuestionsBySearch.mockReturnValue(mockQuestions);

        const response = await supertest(server).get("/question/getQuestion").query(mockReqQuery);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQuestions);
    });

    it("should return a question by id and increment its views by 1", async () => {
        const qid = "65e9b5a995b6c7045a30d823";
        const mockQuestion = { _id: qid, title: "Test Question", views: 99 };

        Question.findOneAndUpdate.mockImplementation(() => ({
            populate: jest.fn().mockImplementation(() => ({
                populate: jest.fn().mockResolvedValueOnce(mockQuestion),
            })),
        }));

        const response = await supertest(server).get(`/question/getQuestionById/${qid}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQuestion);
    }, 10000);

    it("should add a new question", async () => {
        const mockQuestion = {
            title: "New Question",
            text: "Detailed text",
            tags: ["tag1", "tag2"],
            answers: [],
        };
        const expectedQuestion = { ...mockQuestion, _id: "newId" };

        addTag.mockResolvedValue(["tag1", "tag2"]);
        Question.create.mockResolvedValue(expectedQuestion);

        const response = await supertest(server).post("/question/addQuestion").send(mockQuestion);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedQuestion);
    });

    it("should delete a question if user is a moderator", async () => {
        const qid = "65e9b5a995b6c7045a30d823";

        User.findById.mockResolvedValue({ _id: "userid", role: "moderator" });
        Question.findById.mockResolvedValue({ _id: qid });
        Question.findByIdAndDelete.mockResolvedValue({});

        const response = await supertest(server)
            .delete(`/question/deleteQuestion/${qid}`)
            .set(
                "Cookie",
                `access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI1YTIzZTEwMDMxNjRhNGI4MjE2NjAiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzEzNzUwNDk1fQ.S2ssKzKBghhP9-dm0n2grqd4riNAHI18Ji1KUNEhfNA`
            );

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Question deleted successfully");
    });

    it("should return 403 if user is not a moderator", async () => {
        const qid = "65e9b5a995b6c7045a30d823";

        User.findById.mockResolvedValue({ _id: "userid", role: "user" });

        const response = await supertest(server)
            .delete(`/question/deleteQuestion/${qid}`)
            .set(
                "Cookie",
                `access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI1YTIzZTEwMDMxNjRhNGI4MjE2NjAiLCJyb2xlIjoibW9kZXJhdG9yIiwiaWF0IjoxNzEzNzUwNDk1fQ.S2ssKzKBghhP9-dm0n2grqd4riNAHI18Ji1KUNEhfNB`
            );

        console.log("🚀 ~ it ~ response:", response.body);
        expect(response.status).toBe(403);
        expect(response.body.message).toEqual("Access Denied: Insufficient permissions");
    });

    it("should return 400 if no authentication token is present", async () => {
        const response = await supertest(server).get("/question/getFlaggedQuestions");

        expect(response.status).toBe(400);
        expect(response.body.error).toEqual("User not authenticated");
    });

    it("should return 400 for unauthorized access to a moderator-only endpoint", async () => {
        const response = await supertest(server).get("/question/getFlaggedQuestions");

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Access Denied: Insufficient permissions");
    });
});

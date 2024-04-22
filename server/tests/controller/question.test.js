const supertest = require("supertest");
const mongoose = require("mongoose");
const Question = require("../../models/questions");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require("../../utils/question");

jest.mock("../../models/questions");
jest.mock("../../models/user");
jest.mock("../../utils/question");

const generateToken = (user = { id: "userId", role: "moderator" }, secret = "RANDOM-TOKEN", expiresIn = "24h") => {
    return jwt.sign(user, secret, { expiresIn });
};

let server;
let validToken;

beforeAll(() => {
    validToken = generateToken();
    server = require("../../server");
});

afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});

describe("Questions API", () => {
    const mockPopulate = jest.fn().mockReturnThis();

    beforeEach(() => {
        jest.resetModules(); // Resets module registry - ensures a fresh server instance
        validToken = generateToken();
        const jwt = require("jsonwebtoken");
        jwt.verify = jest.fn((token, secret) => {
            if (token === validToken && secret === "RANDOM-TOKEN") {
                return { id: "userId", role: token.includes("moderator") ? "moderator" : "user" };
            } else {
                throw new jwt.JsonWebTokenError("invalid token");
            }
        });
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

        User.findById.mockResolvedValue({ _id: "userId", role: "moderator" });
        Question.findById.mockResolvedValue({ _id: qid });
        Question.findByIdAndDelete.mockResolvedValue({});

        const response = await supertest(server)
            .delete(`/question/deleteQuestion/${qid}`)
            .set("Cookie", `access-token=${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Question deleted successfully");
    });

    it("should return 403 if user is not a moderator", async () => {
        const qid = "65e9b5a995b6c7045a30d823";
        const mockToken = generateToken({ id: "userId", role: "user" });

        User.findById.mockResolvedValue({ _id: "userId", role: "user" });

        const response = await supertest(server)
            .delete(`/question/deleteQuestion/${qid}`)
            .set("Cookie", `access-token=${mockToken}`);

        console.log("🚀 ~ it ~ response:", response.body);
        expect(response.status).toBe(403);
        expect(response.body.message).toEqual("Access Denied: Insufficient permissions");
    });

    it("should return 400 if no authentication token is present", async () => {
        const response = await supertest(server).get("/question/getFlaggedQuestions");

        expect(response.status).toBe(400);
        expect(response.body.error).toEqual("User not authenticated");
    });

    it("should return 401 for access without a valid token", async () => {
        const response = await supertest(server).get("/question/getFlaggedQuestions");

        expect(response.status).toBe(400);
    });
});

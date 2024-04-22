const request = require("supertest");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
jest.mock("../../models/user");

const app = express();
app.use(express.json());

const auth = require("../../controller/auth");
app.use(auth);

describe("POST /register", () => {
    beforeEach(() => {
        User.findOne.mockClear();
        User.prototype.save.mockClear();
    });

    it("should register a new user successfully", async () => {
        User.findOne.mockResolvedValueOnce(null);
        User.findOne.mockResolvedValueOnce(null);
        User.prototype.save.mockResolvedValueOnce({
            email: "newuser@example.com",
            username: "newUser",
            password: "hashedPassword",
        });

        const response = await request(app)
            .post("/register")
            .send({ email: "newUser@example.com", password: "password123", username: "newUser" });

        expect(response.status).toBe(200);
        expect(response.body).toBe("Registration successful");
        expect(User.findOne).toHaveBeenCalledTimes(2);
    });

    it("should fail if email already exists", async () => {
        User.findOne.mockResolvedValueOnce({ email: "existing@example.com" });

        const response = await request(app)
            .post("/register")
            .send({ email: "existing@example.com", password: "password123", username: "newUser" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: "failed",
            message: "This email is already registered. Please try logging in instead.",
        });
    });

    it("should fail if username already exists", async () => {
        User.findOne.mockResolvedValueOnce(null);
        User.findOne.mockResolvedValueOnce({ username: "newUser" });

        const response = await request(app)
            .post("/register")
            .send({ email: "newUser@example.com", password: "password123", username: "newUser" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: "failed",
            message: "This username is already taken. Please try another one.",
        });
    });
});

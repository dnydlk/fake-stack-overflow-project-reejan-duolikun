const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { sign, verify } = require("jsonwebtoken");

const router = express.Router();

const signup = async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                message: "This email is already registered. Please try logging in instead.",
            });

        // Check if username already exists if provided
        if (userName && userName != "") {
            const existingUsername = await User.findOne({ userName });
            if (existingUsername)
                return res.status(400).json({
                    status: "failed",
                    message: "This username is already taken. Please try another one.",
                });
        }

        // hash the password
        bcrypt.hash(password, 10).then((hashedPwd) => {
            // create an instance of a user
            const newUser = new User({
                email: email,
                password: hashedPwd,
                userName: userName != "" ? userName : email.split("@")[0],
            });

            // save new user into the database
            newUser.save().then((result) => {
                res.status(200).json("Registration successful");
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email }).populate("email password");

        // If user doesn't exist, return error
        if (!existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "User with the email doesn't exist.",
            });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid password.",
            });
        }

        // Create JWT token
        const accessToken = createTokens(existingUser);

        // store the token in cookie
        res.cookie("access-token", accessToken, {
            // cookies will expires after 24 hours
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        // If user exists and password is correct, login successful
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
};

const getUserInfo = async (req, res) => {
    if (!req.user) {
        return res.status(400).json({ error: "User information not available" });
    }

    try {
        const userId = req.user.userId; 
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(existingUser); // Send user information back to client
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const createTokens = (user) => {
    const accessToken = sign({ userId: user._id }, JWT_SECRET);
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.status(400).json({ error: "User not authenticated" });
    }
    try {
        const decodedToken = verify(accessToken, JWT_SECRET);
        if (decodedToken) {
            req.authenticated = true;
            req.user = decodedToken;
            console.log("Token validated");
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};


const validateUserToken = (req, res) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        console.log("🚀 ~ validateUserToken ~ !accessToken:", accessToken);
        return res.status(401).json({ authenticated: false });
    }
    try {
        const validToken = verify(accessToken, JWT_SECRET);
        if (validToken) {
            console.log("🚀 ~ validateUserToken ~ validToken:", validToken);
            return res.status(200).json({ authenticated: true });
        }
    } catch (err) {
        return res.status(401).json({ authenticated: false, error: "Token is invalid" });
    }
};

const logout = (req, res) => {
    res.clearCookie("access-token");
    res.status(200).json({ message: "Logout successful" });
};

// Routers
router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-user-info", validateToken, getUserInfo);
router.get("/validate-token", validateUserToken);

module.exports = router;

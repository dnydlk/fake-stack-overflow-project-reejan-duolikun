const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { sign, verify } = require("jsonwebtoken");

const router = express.Router();

const signup = async (req, res) => {
	try {
		const { email, password, username } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({
				status: "failed",
				message: "This email is already registered. Please try logging in instead.",
			});

		// Check if username already exists if provided
		if (username && username != "") {
			const existingUsername = await User.findOne({ username });
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
				username: username != "" ? username : email.split("@")[0],
				role: email.endsWith("@moderator.com") ? "moderator" : "user",
			});

			// save new user into the database
			newUser.save().then(() => {
				// Create JWT token
				const accessToken = createTokens(newUser);

				// store the token in cookie
				res.cookie("access-token", accessToken, {
					// cookies will expires after 24 hours
					maxAge: 1000 * 60 * 60 * 24,
					httpOnly: true,
				});
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
		// populate("askedQuestion answeredQuestion votedAnswer");
		// const existingUser = await User.findById(userId).populate("askedQuestion answeredQuestion votedAnswer");
		const existingUser = await User.findById(userId)
			.populate({
				path: "askedQuestion",
				populate: [
					{ path: "tags", model: "Tag" },
					{ path: "answers", model: "Answer" },
					{ path: "asked_by", model: "User" },
				],
			})
			.populate({
				path: "answeredQuestion",
				populate: {
					path: "ans_by",
					model: "User",
				},
			})
			.populate({
				path: "votedAnswer",
				populate: {
					path: "answer",
					model: "Answer",
				},
			});

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
	const accessToken = sign({ userId: user._id, role: user.role }, JWT_SECRET);
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

const updateUser = async (req, res) => {
	if (!req.user) {
		return res.status(400).json({ error: "User information not available" });
	}

	try {
		const userId = req.user.userId;
		const existingUser = await User.findById(userId);

		if (!existingUser) {
			return res.status(404).json({ error: "User not found" });
		}

		const { userName, location, title, aboutMe, link } = req.body;

		if (userName) {
			existingUser.userName = userName;
		}

		if (location) {
			existingUser.location = location;
		}

		if (title) {
			existingUser.title = title;
		}

		if (aboutMe) {
			existingUser.aboutMe = aboutMe;
		}

		if (link) {
			existingUser.link = link;
		}

		await existingUser.save();
		res.json(existingUser); // Send user information back to client
	} catch (err) {
		console.error("Database error: ", err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Routers
router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-user-info", validateToken, getUserInfo);
router.get("/validate-token", validateUserToken);
router.put("/update-user-info", validateToken, updateUser);

module.exports = router;

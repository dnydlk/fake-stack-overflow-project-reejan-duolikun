const express = require("express");
const User = require("../models/user.js")

const router = express.Router();

const registerUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        // create an instance of a user
        const newUser = new User({
            email,
            password,
        });
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "This email is already registered. Please try logging in instead.",
            });
        const savedUser = await newUser.save(); // save new user into the database
        res.status(200).json({
            status: "success",
            message:
                "Your account has been successfully created.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email }).populate('email password');
  
      // If user doesn't exist, return error
      if (!existingUser) {
        return res.status(400).json({
          status: "failed",
          data: [],
          message: "Invalid email or password.",
        });
      }
  
      // Check if password is correct
    //   const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); TODO password hashing
  
      // Check if password is correct
    if (password !== existingUser.password) {
        return res.status(400).json({
          status: "failed",
          data: [],
          message: "Invalid email or password.",
        });
      }
  
      // If user exists and password is correct, login successful
      res.status(200).json({
        status: "success",
        message: "Login successful.",
        // Need to add session token here TODO

      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        code: 500,
        data: [],
        message: "Internal Server Error",
      });
    }
  };
  

// add appropirate HTTP verbs and their endpoints to the router
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

module.exports = router;

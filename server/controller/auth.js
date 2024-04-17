const express = require("express");
const User = require("../models/user.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const router = express.Router();

const registerUser = async(req, res) => {
  try {
      const { email, password, displayName } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser)
          return res.status(400).json({
              status: "failed",
              message: "This email is already registered. Please try logging in instead.",
          });
      // hash the password
      bcrypt
        .hash(password, 10)
        .then( (hashedPwd) => {
            // create an instance of a user
          const newUser = new User({
            email : email,
            password : hashedPwd,
            displayName: displayName,
          });

          // save new user into the database
          newUser
            .save()
            .then ((result) => {
              res.status(200).json({
                status: "success",
                message:
                    "Your account has been successfully created.",
              });
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

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email }).populate('email password');
  
      // If user doesn't exist, return error
      if (!existingUser) {
        return res.status(400).json({
          status: "failed",
          message: "User with the email doesn't exist.",
        });
      }

      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  
      // Check if password is correct
      if (!isPasswordCorrect) {
          return res.status(400).json({
            status: "failed",
            message: "Invalid password.",
          });
      }

      //   create JWT token
      const token = jwt.sign(
        {
          userId: existingUser._id,
          userEmail: existingUser.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
  
      // If user exists and password is correct, login successful
      res.status(200).json({
        status: "success",
        email: existingUser.email,
        message: "Login successful.",
        token
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

import React, { useState, useContext} from "react";
import { registerUser } from "../../services/userService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/auth.css";
import { AuthContext } from "../authContext";

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isValid, setIsValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

    // Function to handle signup action
    const handleSubmit = async () => {
        try {
            // Check if email and password are provided
            if (!email || !password) {
                throw new Error("Please provide both email and password");
            }

      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
  
      // Create an object containing the signup data
      const signupData = {
        email: email,
        password: password,
        userName: userName
      };
  
      // Send a POST request to the backend with the signup data
      const response = await registerUser(signupData);
  
      // Check if the request was successful
      if (response.status == 200) {
        // Reset email, password, and confirmPassword fields after successful signup attempt
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setUserName('');
        // Set success message
        setSuccessMessage("Signup successful! Redirecting to the login page...");
        // Navigate to the home page after a delay
        setTimeout(() => {
           // Save the jwtToken in the context
          setToken(response.data.token);
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          navigate("/home");
        }, 500); // Adjust delay as needed
      } else {
        // If the request fails, throw an error or handle it accordingly
        throw new Error(response.response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message);
    }
  };

    const handlePwdChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        // Regular expression to match passwords with at least 8 characters,
        // including at least one letter and one number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Check if the new password matches the regex pattern
        setIsValid(passwordRegex.test(newPassword));
    };

    const validateEmail = (email) => {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        if (!validateEmail(inputEmail)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

  const handleUserNameChange = (e) => {
    const inputUserNameChange = e.target.value;
    setUserName(inputUserNameChange);
  };

  return (
    <div className="signup-container" data-cy-test="signup-container">
      <Link to="/"> 
        <img src="logo_stack_overflow.png" 
              alt="icon of fake stack overflow" 
              className="fso-logo mb-2" 
              data-cy-test="logo"/>
      </Link>
      <h2>Sign Up</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message" data-cy-test="errMsg">{errorMessage}</div>}
      <div className="signup-form">
          <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            data-cy-test="signUpEmail"
            required
          />
          </div>
          {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePwdChange}
            data-cy-test="signUpPassword"
            required
          />
          {!isValid && (
            <p style={{ color: 'red' }}>
              Password must contain at least eight characters, including at least one letter and one number.
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            data-cy-test="signUpConfirmPwd"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor='userName'>User Name:</label>
          <input
            type= "text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            data-cy-test="signUpUserName"
            placeholder='optional'
            />
          </div>
        <button className="signup-button" onClick={handleSubmit} data-cy-test="signUpBtn">Sign Up</button>
      </div>
      <div className="login-link" data-cy-test="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default SignupPage;

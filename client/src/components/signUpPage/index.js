import React, { useState } from 'react';
import { registerUser} from "../../services/userService";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

 // Function to handle signup action
const handleSubmit = async () => {
    try {
      // Check if email and password are provided
      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
  
      // Create an object containing the signup data
      const signupData = {
        email: email,
        password: password
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
        // Set success message
        setSuccessMessage("Signup successful! Redirecting to the login page...");
        // Navigate to the welcome page after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Adjust delay as needed
      } else {
        // If the request fails, throw an error or handle it accordingly
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message);
    }
  };
  

  return (
    <div className="signup-container">
      <Link to="/"> 
        <img src="logo_stack_overflow.png" 
              alt="icon of fake stack overflow" 
              className="fso-logo mb-2" 
              data-cy-test="logo"/>
      </Link>
      <h2>Sign Up</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
      </div>
      <div className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default SignupPage;

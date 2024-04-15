import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { loginUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import "../../stylesheets/auth.css";

const LoginPage = () => {
  // State variables to store user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle login action
  const handleLogin = async () => {
    try {

      // Check if email and password are provided
      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }
      // Create an object containing the login credentials
      const loginData = {
        email: email,
        password: password
      };
  
      // Send a POST request to the backend with the login credentials
      const response = await loginUser(loginData);
  
      // Check if the request was successful
      if (response.status == 200) {
        // Reset email and password fields after successful login attempt
        setEmail('');
        setPassword('');
        
        // Save the jwtToken in the context
        setToken(response.data.token);
        localStorage.setItem("jwtToken", response.data.token);
        navigate('/');
      } else {
        setToken(null);
        localStorage.removeItem("jwtToken");
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message);
    }
  };

  // const handleLogoClick = () => {
  //   navigate("/");
  // };

  return (
    <div className="login-container" data-cy-test="login-container">
      <Link to="/"> 
        <img src="logo_stack_overflow.png" 
              alt="icon of fake stack overflow" 
              className="fso-logo mb-2" 
              data-cy-test="logo"/>
      </Link>
      <h2>Login</h2>
      {errorMessage && <div className="error-message" data-cy-test="errMsg">{errorMessage}</div>}
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            data-cy-test="loginEmail"
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
            data-cy-test="loginPassword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" onClick={handleLogin} data-cy-test="loginBtn">Login</button>
      </div>
      <div className="signup-link" data-cy-test="signUpLink">
        {"Don't have an account?"} <Link to="/signup" >Signup here</Link>
      </div>
    </div>
  );
}

export default LoginPage;

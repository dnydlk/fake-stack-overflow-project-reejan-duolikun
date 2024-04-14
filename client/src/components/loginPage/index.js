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
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle login action
  const handleLogin = async () => {
    try {
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
    }
  };

  const handleLogiClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <img src="logo_stack_overflow.png" 
            alt="icon of fake stack overflow" 
            className="fso-logo mb-2" 
            data-cy-test="logo" onClick={handleLogiClick}/>
      <h2>Login</h2>
      <div className="login-form">
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
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
      <div className="signup-link">
        {"Don't have an account?"} <Link to="/signup">Signup here</Link>
      </div>
    </div>
  );
}

export default LoginPage;

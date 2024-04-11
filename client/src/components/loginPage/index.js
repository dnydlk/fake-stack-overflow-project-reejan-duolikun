import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../../stylesheets/login.css";
import { loginUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // State variables to store user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        // Here you can redirect the user to another page or perform any other action
        navigate('/home');
      } else {
        // If the request fails, throw an error or handle it accordingly
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error
    }
  };
  

  return (
    <div className="login-container">
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

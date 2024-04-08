import React, { useState } from 'react';

function LoginPage() {
  // State variables to store user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 // Function to handle login action
const handleLogin = async () => {
    try {
      // Create an object containing the login credentials
      const loginData = {
        email: email,
        password: password
      };
  
      // Send a POST request to the backend with the login credentials
      const response = await fetch('/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Reset email and password fields after successful login attempt
        setEmail('');
        setPassword('');
        // Here you can redirect the user to another page or perform any other action
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
    <div className="container">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;

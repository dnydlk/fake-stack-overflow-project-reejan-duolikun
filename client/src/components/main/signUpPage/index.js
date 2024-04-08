import React, { useState } from 'react';
import { registerUser} from "../../../services/userService";

function SignupPage( {handleSignUp} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 // Function to handle signup action
const handleSubmit = async () => {
    try {
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
        // Here you can redirect the user to another page or perform any other action
        handleSignUp();
      } else {
        // If the request fails, throw an error or handle it accordingly
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error
    }
  };
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
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
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
}

export default SignupPage;

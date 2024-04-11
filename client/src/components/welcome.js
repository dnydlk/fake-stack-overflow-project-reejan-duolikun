import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/welcome.css"

export default function Welcome() {
  return (
    <div className="welcome-container">

      <img src="logo_stack_overflow.png" alt="Fake Stack Overflow Logo" className="fso-logo" />     
      <h1>Welcome to Our FakeStackOverflow</h1>
      <div className="fso-header">
        <div className="auth-links">
          <Link to="/login" className="auth-link">Login</Link>
          <span className="auth-divider">|</span>
          <Link to="/signup" className="auth-link">Signup</Link>
        </div>
      </div>
    </div>
  );
}

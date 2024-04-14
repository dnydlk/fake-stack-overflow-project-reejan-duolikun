// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./stylesheets/App.css";
//import Welcome from "./components/welcome";
import Login from "./components/loginPage";
import SignUp from "./components/signUpPage";
import FakeStackOverflow from "./components/fakestackoverflow";
import { AuthProvider } from "./components/authContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Welcome />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<FakeStackOverflow />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

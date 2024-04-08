import React from "react";
import { useState } from "react";
import SignupPage from "./signUpPage";
import HomePage from "./homePage";

const Main = () => {
    const [page, setPage] = useState("signup");
    let content = null;

    const handleSignUp = () => {
        setPage("home");
    };

    const getSignUpPage = () => {
        return (
            <SignupPage handleSignUp={handleSignUp}/>
        );
    };

    const getHomePage = () => {
        return (
            <HomePage/>
        );
    };

    switch (page) {
        case "signup": {
            content = getSignUpPage();
            break;
        }
        case "home": {
            content = getHomePage();
            break;
        }
        default:
            break;
    }

    return (
        <div id="main" className="main">
            <div>
                {content}
            </div>
        </div>
    );
};

export default Main;

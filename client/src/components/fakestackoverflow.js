import React from "react";
import Header from "./header";
import Main from "./main";

export default function fakeStackOverflow() {
    // const [mainTitle, setMainTitle] = useState("signup");

    // setSignUpPage = (title = "Sign Up") => {
    //     setMainTitle(title);
    // }
    return (
        <div>
            <Header/>
            <Main/>
        </div>
    );
}
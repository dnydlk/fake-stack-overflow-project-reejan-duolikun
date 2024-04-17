import React, { useState} from "react";
import Header from "./header";
import Main from "./main";
//import { AuthContext } from "./authContext";
//import { Navigate } from "react-router";

export default function FakeStackOverflow() {
    //const { token, loading } = useContext(AuthContext);
    const [search, setSearch] = useState("")
    const [mainTitle, setMainTitle] = useState("All Questions");

    // if (loading) {
    //     return null;
    //   }
    
    // if (!token) {
    // return <Navigate to="/login" replace />;
    // }

    const setQuestionPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
    };

    return (
        <>
            <Header search={search} setQuestionPage={setQuestionPage} />
            <Main title={mainTitle} search={search} setQuestionPage={setQuestionPage} />
        </>
    );
}

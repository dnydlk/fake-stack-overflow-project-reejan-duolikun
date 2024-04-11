import React, { useState } from "react";
import Header from "./header";
import Main from "./main";

export default function fakeStackOverflow() {
    const [search, setSearch] = useState("")
    const [mainTitle, setMainTitle] = useState("All Questions");

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

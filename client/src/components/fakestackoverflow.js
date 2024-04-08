import React, { useState } from "react";
import Header from "./header";

export default function fakeStackOverflow() {
    const [search, setSearch] = useState("")
    const [mainTitle, setMainTitle] = useState("All Questions");
    console.log("🚀 ~ fakeStackOverflow ~ mainTitle:", mainTitle)

    const setQuestionPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
    };

    return (
        <>
            <Header search={search} setQuestionPage={setQuestionPage} />
        </>
    );
}

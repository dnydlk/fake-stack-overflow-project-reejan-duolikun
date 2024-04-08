import "./index.css";
import React, { useState } from "react";
import SideBarNav from "./sideBarNav";

const Main = ({ search = "", title, setQuestionPage }) => {
    console.log("🚀 ~ Main ~ title:", title);
    console.log("🚀 ~ Main ~ search:", search);
    const [page, setPage] = useState("home");
    console.log("🚀 ~ Main ~ setPage:", setPage);
    console.log("🚀 ~ Main ~ page:", page);
    const [questionOrder, setQuestionOrder] = useState("newest");
    console.log("🚀 ~ Main ~ setQuestionOrder:", setQuestionOrder);
    console.log("🚀 ~ Main ~ questionOrder:", questionOrder);
    const [qid, setQid] = useState("");
    console.log("🚀 ~ Main ~ setQid:", setQid);
    console.log("🚀 ~ Main ~ qid:", qid);
    let selected = "";
    console.log("🚀 ~ Main ~ selected:", selected);
    let content = null;
    console.log("🚀 ~ Main ~ content:", content);

    const handleQuestions = () => {
        setQuestionPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };
    console.log("🚀 ~ handleAnswer ~ handleAnswer:", handleAnswer);

    const clickTag = (tname) => {
        setQuestionPage("[" + tname + "]", tname);
        setPage("home");
    };
    console.log("🚀 ~ clickTag ~ clickTag:", clickTag);

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };
    console.log("🚀 ~ handleNewQuestion ~ handleNewQuestion:", handleNewQuestion);

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };
    console.log("🚀 ~ handleNewAnswer ~ handleNewAnswer:", handleNewAnswer);

    // const getQuestionPage = (order = "newest", search = "") => {
    //     return (
    //         <QuestionPage
    //             title_text={title}
    //             order={order}
    //             search={search}
    //             setQuestionOrder={setQuestionOrder}
    //             clickTag={clickTag}
    //             handleAnswer={handleAnswer}
    //             handleNewQuestion={handleNewQuestion}
    //         />
    //     );
    // };

    return (
        <div id="main-content" className="fso-main d-flex flex-column">
            <SideBarNav selected={selected} handleQuestions={handleQuestions} handleTags={handleTags} />
        </div>
    );
};

export default Main;

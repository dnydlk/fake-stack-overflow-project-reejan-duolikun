import "./index.css";
import React, { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import AnswerPage from "./answerPage";

const Main = ({ search = "", title, setQuestionPage }) => {
    const [page, setPage] = useState("home");
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");
    
    let selected = "";
    let content = null;

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

    const clickTag = (tagName) => {
        setQuestionPage("[" + tagName + "]", tagName);
        setPage("home");
    };

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };
    console.log("🚀 ~ handleNewAnswer ~ handleNewAnswer:", handleNewAnswer);

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
            />
        );
    };

    switch (page) {
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search);
            break;
        }
        case "tag": {
            selected = "t";
            // content = <TagPage clickTag={clickTag} handleNewQuestion={handleNewQuestion} />;
            break;
        }
        case "answer": {
            selected = "";
            content = <AnswerPage qid={qid} handleNewQuestion={handleNewQuestion} handleNewAnswer={handleNewAnswer} />;
            break;
        }
        // case "newQuestion": {
        //     selected = "";
        //     content = <NewQuestion handleQuestions={handleQuestions} />;
        //     break;
        // }
        // case "newAnswer": {
        //     selected = "";
        //     content = <NewAnswer qid={qid} handleAnswer={handleAnswer} />;
        //     break;
        // }
        default:
            selected = "q";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main-content" className="fso-main ">
            {/*//- Sidebar Navigation  */}
                <SideBarNav selected={selected} handleQuestions={handleQuestions} handleTags={handleTags} />
            {/*//- Right Main Content  */}
            <div id="right_main" className="fso-right-main">
                {content}
            </div>
        </div>
    );
};

export default Main;

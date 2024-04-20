import { useContext, useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import * as questionService from "../../../services/questionService";
import { AuthContext } from "../../../authProvider";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer, currentUser }) => {
    const { isTokenValid } = useContext(AuthContext) || {};
    const [question, setQuestion] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let res = await questionService.getQuestionById(qid);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    return (
        <div id="answer-page">
            {/*//- Question title */}
            <AnswerHeader
                ansCount={question && question.answers && question.answers.length}
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
                views={question && question.views}
                meta={question && getMetaData(new Date(question.ask_date_time))}
            />
            {/*//- Question text */}
            <QuestionBody
                views={question && question.views}
                text={question && question.text}
                askBy={question && question.asked_by && question.asked_by.username}
                meta={question && getMetaData(new Date(question.ask_date_time))}
            />

            {/*//- Answer Count  */}
            {question && question.answers && question.answers.length !== 0 && (
                <div className="d-flex m-1" data-cy-test="answer-page-answer-count">
                    <div className="fso-bold-title ms-2 mt-1">{question.answers.length}</div>
                    {question.answers.length === 1 ? (
                        <div className="fso-bold-title ms-2 mt-1">Answer</div>
                    ) : (
                        <div className="fso-bold-title ms-2 mt-1">Answers</div>
                    )}
                </div>
            )}

            {/*//- Answer list */}
            {question &&
                question.answers &&
                question.answers.map((a, idx) => <Answer key={idx} answer={a} currentUser={currentUser} />)}

            {/*//- Answer Question button */}
            <button
                className="fso-blue-btn fso-ans-button"
                data-cy-test="answer-page-post-answer"
                onClick={() => {
                    handleNewAnswer(isTokenValid);
                }}>
                Post Your Answer
            </button>
        </div>
    );
};

export default AnswerPage;

import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer }) => {
    const [question, setQuestion] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    return (
        <>
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
                askBy={question && question.asked_by}
                meta={question && getMetaData(new Date(question.ask_date_time))}
            />

            {/*//- Answer Count  */}
            {question && question.answers && question.answers.length !== 0 && (
                <div className="d-flex m-1">
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
                question.answers.map((a, idx) => (
                    <Answer key={idx} text={a.text} ansBy={a.ans_by} meta={getMetaData(new Date(a.ans_date_time))} />
                ))}

            {/*//- Answer Question button */}
            <button
                className="fso-blue-btn fso-ans-button"
                onClick={() => {
                    handleNewAnswer();
                }}>
                Answer Question
            </button>
        </>
    );
};

export default AnswerPage;
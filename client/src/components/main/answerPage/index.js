import { useContext, useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import * as questionService from "../../../services/questionService";
import { AuthContext } from "../../../authProvider";
import { useNavigate } from "react-router";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer, currentUser, setPage }) => {
    const { isTokenValid } = useContext(AuthContext) || {};

    const [question, setQuestion] = useState({});

    const [flagText, setFlagText] = useState("Flag as inappropriate");

    const navigate = useNavigate();

    const handleFlag = async () => {
        if (!isTokenValid) {
            alert("You must be logged in to flag a question");
            return;
        } else {
            if (question.isFlagged) {
                const updatedQuestion = await questionService.flagQuestion({
                    questionId: qid,
                    userId: currentUser._id,
                });
                if (!updatedQuestion) {
                    alert("Question not found");
                    return;
                }
                setQuestion(updatedQuestion.question);
                setFlagText("Flag as inappropriate");
            } else {
                const updatedQuestion = await questionService.flagQuestion({
                    questionId: qid,
                    userId: currentUser._id,
                });
                if (!updatedQuestion) {
                    alert("Question not found");
                    return;
                }
                setQuestion(updatedQuestion.question);
                setFlagText("Unflag");
            }
        }
    };

    const handleDelete = async (questionId) => {
        console.log("🚀 ~ handleDelete ~ questionId:", questionId);
        // Ask for confirmation
        const response = window.confirm("Are you sure you want to delete this question?");
        if (!response) {
            return;
        } else {
            // Delete the question
            await questionService.deleteQuestion(questionId).then(() => {
                setPage("home");
                navigate("/");
            });
        }
    };

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
                question={question}
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
            <div className="fso-space-between">
                <button
                    className="fso-blue-btn fso-ans-button"
                    data-cy-test="answer-page-post-answer"
                    onClick={() => {
                        handleNewAnswer(isTokenValid);
                    }}>
                    Post Your Answer
                </button>
                {currentUser && (
                    <button className="fso-yellow-btn ms-2" onClick={() => handleFlag()}>
                        {flagText}
                    </button>
                )}
            </div>
            {currentUser && currentUser.role && currentUser.role === "moderator" ? (
                <div className="fso-space-between">
                    <div></div>
                    <button className="fso-delete-btn ms-2" onClick={() => handleDelete(qid)}>
                        Delete Question
                    </button>
                </div>
            ) : (
                ""
            )}
            {/* <pre>
                <code>{JSON.stringify(question, null, 2)}</code>
            </pre>
            <pre>
                <code>{JSON.stringify(currentUser._id, null, 2)}</code>
            </pre> */}
        </div>
    );
};

export default AnswerPage;

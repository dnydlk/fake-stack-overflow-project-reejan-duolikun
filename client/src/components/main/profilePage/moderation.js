import React, { useEffect, useState } from "react";
import * as questionService from "../../../services/questionService";

const Moderation = ({ currentUser, handleAnswer }) => {
    console.log("🚀 ~ Activities ~ currentUser:", currentUser);

    const [flaggedQuestions, setFlaggedQuestions] = useState([]);

    const handleClickOnQuestionTitle = async (questionId) => {
        handleAnswer(questionId);
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
                setFlaggedQuestions(flaggedQuestions.filter((q) => q._id !== questionId));
            });
        }
    };

    useEffect(() => {
        const fetchFlaggedQuestions = async () => {
            const response = await questionService.getFlaggedQuestion();
            setFlaggedQuestions(response);
        };
        fetchFlaggedQuestions();
    }, []);
    console.log("🚀 ~ Activities ~ votedAnswers:", flaggedQuestions);

    return (
        <>
            <div className="fso-bold-title">Question:</div>

            <div className="">
                <div className="row">
                    <div className="col col-1 m-2">#</div>
                    <div className="col m-2">Question Link</div>
                    <div className="col col-1 m-2">FlaggedBy</div>
                    <div className="col col-1 m-2">Delete</div>
                </div>
                {flaggedQuestions &&
                    flaggedQuestions.map((q, index) => (
                        <div className="d-flex" key={q._id}>
                            <div className="m-2 me-4">{index + 1}</div>
                            <div className="m-2 w-75">
                                <div
                                    className="fso-moderator-link"
                                    onClick={() => {
                                        handleClickOnQuestionTitle(q._id);
                                    }}>
                                    {q.title}
                                </div>
                            </div>
                            <div className="m-2 ms-auto fso-question-author">{q.flaggedBy.username}</div>
                            <div className="m-2">
                                <button
                                    className=" fso-red-btn"
                                    onClick={() => {
                                        handleDelete(q._id);
                                    }}>
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        flaggedQuestions.map((q) => q),
                        null,
                        2
                    )}
                </code>
            </pre>
            <div className="fso-bold-title">Who:</div>
            <pre>
                <code>{JSON.stringify(currentUser, null, 2)}</code>
            </pre>
        </>
    );
};

export default Moderation;
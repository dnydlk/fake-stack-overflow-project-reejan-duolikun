import React, { useEffect, useState } from "react";
import Question from "../questionPage/question";
import Answer from "../answerPage/answer";
import * as answerService from "../../../services/answerService";

const Activities = ({ currentUser, clickTag, handleAnswer }) => {
    console.log("🚀 ~ Activities ~ currentUser:", currentUser);
    console.log("🚀 ~ Activities ~ currentUser.askedQuestion.length:", currentUser.askedQuestion.length);

    const [votedAnswers, setVotedAnswers] = useState([]);

    useEffect(() => {
        const fetchVotedAnswers = async () => {
            const response = await answerService.getAnswersByUser(currentUser._id);
            setVotedAnswers(response);
        };
        fetchVotedAnswers();
    }, []);
    console.log("🚀 ~ Activities ~ votedAnswers:", votedAnswers);

    return (
        <>
            <div className="fso-bold-title">Question:</div>
            <div data-cy-test="asked">
                {currentUser.askedQuestion &&
                    currentUser.askedQuestion.map((question) => (
                        <Question key={question.qid} q={question} clickTag={clickTag} handleAnswer={handleAnswer} />
                    ))}
            </div>
            {currentUser.askedQuestion.length === 0 && <div className="mb-2">No Questions</div>}
            <div className="fso-bold-title">Answer:</div>
            <div data-cy-test="answered">
                {currentUser.answeredQuestion &&
                    currentUser.answeredQuestion.map((answer) => (
                        <Answer key={answer.aid} answer={answer} currentUser={currentUser} />
                    ))}
            </div>
            {currentUser.answeredQuestion.length === 0 && <div className="mb-2">No Answers</div>}
            <div className="fso-bold-title mt-2">Vote:</div>
            <div data-cy-test="voted">
                {votedAnswers &&
                    votedAnswers.map((answer) => <Answer key={answer.aid} answer={answer} currentUser={currentUser} />)}
            </div>
            {currentUser.votedAnswer.length === 0 && <div className="mb-2">No Votes</div>}
        </>
    );
};

export default Activities;

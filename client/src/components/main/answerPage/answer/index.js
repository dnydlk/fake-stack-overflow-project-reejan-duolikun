import { handleHyperlink } from "../../../../tool";
import "./index.css";
import { ReactComponent as UpvoteIcon } from "./vote_icon.svg";
import { useEffect, useState } from "react";
import * as answerService from "../../../../services/answerService";
import { getMetaData } from "../../../../tool";

// Component for the Answer Page
const Answer = ({ answer, currentUser }) => {
    console.log("🚀 ~ Answer ~ answer:", answer)
    const [currentVotes, setCurrentVotes] = useState();

    const fetchCurrentVotes = async () => {
        const response = await answerService.fetchCurrentVotes(answer._id);
        setCurrentVotes(response.currentVotes);
    };

    const handleVote = async (voteType) => {
        await answerService.vote(currentUser._id, answer._id, voteType);
        fetchCurrentVotes();
    };

    useEffect(() => {
        fetchCurrentVotes();
    }, []);

    return (
        <div className="fso-answer fso-right-padding" data-cy-test="answer-page-answer">
            {/*//- Answer Votes */}
            <div className="d-flex flex-column justify-content-center me-2">
                <button
                    className="m-1 fso-answer-vote-button"
                    data-cy-test="answer-page-up-vote-button"
                    onClick={() => handleVote(true)}>
                    <UpvoteIcon className={"fso-answer-vote-button-up"} />
                </button>
                <div className="m-1 fso-answer-votes text-center" data-cy-test="answer-page-current-votes">
                    {currentVotes}
                </div>
                <button
                    className="m-1 fso-answer-vote-button"
                    data-cy-test="answer-page-down-vote-button"
                    onClick={() => handleVote(false)}>
                    <UpvoteIcon className="fso-answer-vote-button-down" />
                </button>
                {/*//- Answer Text */}
            </div>
            <div id="answerText" className="fso-answer-text" data-cy-test="answer-page-answer-text">
                {handleHyperlink(answer.text)}
            </div>
            <div className="fso-answer-author-block">
                {/*//- Answer Author */}
                <div className="fso-answer-author-name" data-cy-test="answer-page-answer-by">
                    {answer.ans_by.username}
                </div>
                {/*//- Answer Ask Date */}
                <div className="fso-answer-question-meta" data-cy-test="answer-page-answer-meta">
                    {getMetaData(new Date(answer.ans_date_time))}
                </div>
            </div>
        </div>
    );
};

export default Answer;

import { useContext } from "react";
import "./index.css";
import { AuthContext } from "../../../../authProvider";

// Header for the Answer page
const AnswerHeader = ({ ansCount, title, handleNewQuestion, views, meta, question }) => {
    const { isTokenValid } = useContext(AuthContext) || {};
    console.log("🚀 ~ AnswerHeader ~ ansCount:", ansCount);
    return (
        <div id="answersHeader" className="fso-right-padding">
            {/*//- Question title */}
            <div className="fso-space-between">
                <div className="fso-bold-title fso-answer-question-title" data-cy-test="answer-page-question-title">
                    {title}
                </div>
                {/*//- Ask a Question button  */}
                <button
                    className="fso-blue-btn"
                    data-cy-test="ask-question-btn"
                    onClick={() => {
                        handleNewQuestion(isTokenValid);
                    }}>
                    Ask a Question
                </button>
            </div>
            <div className="d-flex">
                {/*//- Asked (question ask date) */}
                <div className="fso-answer-title-detail me-1">Asked</div>
                <div className="fso-answer-title-detail-text me-2" data-cy-test="answer-page-question-meta">
                    {meta}
                </div>
                {/*//- View Count */}
                <div className="fso-answer-title-detail me-1">Viewed</div>
                <div className="fso-answer-title-detail-text" data-cy-test="fso-answer-title-detail-text">
                    {views} times
                </div>
                {question.isFlagged && <div className="fso-flagged-text">This question has been flagged</div>}
            </div>
        </div>
    );
};

export default AnswerHeader;

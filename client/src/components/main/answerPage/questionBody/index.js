import "./index.css";
import React from "react";
import { handleHyperlink } from "../../../../tool";

// Component for the Question's Body
const QuestionBody = ({ views, text, askBy, meta }) => {
    console.log("🚀 ~ QuestionBody ~ views:", views)
    return (
        <div id="questionBody" className="fso-question-body fso-right-padding">
            <div className="fso-answer-question-text" data-cy-test="answer-page-question-text">
                {handleHyperlink(text)}
            </div>
            <div className="fso-answer-question-right">
                <div className="fso-question-author" data-cy-test="answer-page-question-asked-by">
                    {askBy}
                </div>
                <div className="fso-answer-question-meta" data-cy-test="answer-page-question-asked-meta">
                    asked {meta}
                </div>
            </div>
        </div>
    );
};

export default QuestionBody;

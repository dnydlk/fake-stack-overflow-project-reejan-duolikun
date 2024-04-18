import { handleHyperlink } from "../../../../tool";
import "./index.css";

// Component for the Answer Page
const Answer = ({ text, ansBy, meta }) => {
    return (
        <div className="fso-answer fso-right-padding" data-cy-test="answer-page-answer">
            {/*//- Answer Text */}
            <div id="answerText" className="fso-answer-text">
                {handleHyperlink(text)}
            </div>
            <div className="fso-answer-author-block">
                {/*//- Answer Author */}
                <div className="fso-answer-author-name" data-cy-test="answer-page-answer-by">
                    {ansBy}
                </div>
                {/*//- Answer Ask Date */}
                <div className="fso-answer-question-meta" data-cy-test="answer-page-answer-meta">
                    {meta}
                </div>
            </div>
        </div>
    );
};

export default Answer;

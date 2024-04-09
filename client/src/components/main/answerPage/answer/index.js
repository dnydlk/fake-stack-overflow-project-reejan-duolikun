import { handleHyperlink } from "../../../../tool";
import "./index.css";

// Component for the Answer Page
const Answer = ({ text, ansBy, meta }) => {
    return (
        <div className="fso-answer fso-right-padding">
            {/*//- Answer Text */}
            <div id="answerText" className="fso-answer-text">
                {handleHyperlink(text)}
            </div>
            <div className="fso-answer-author-block">
                {/*//- Answer Author */}
                <div className="fso-answer-author-name">{ansBy}</div>
                {/*//- Answer Ask Date */}
                <div className="fso-answer-question-meta">{meta}</div>
            </div>
        </div>
    );
};

export default Answer;

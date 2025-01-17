import OrderButton from "./orderButton";
import { AuthContext } from "../../../../authProvider";
import { useContext } from "react";

const QuestionHeader = ({ title_text, qcnt, setQuestionOrder, handleNewQuestion }) => {
    // added || {} in order to prevent error in testing
    const { isTokenValid } = useContext(AuthContext) || {};

    return (
        <div>
            <div className="fso-space-between fso-right-padding">
                <div data-cy-test="main-page-header" className="fso-bold-title">
                    {title_text}
                </div>
                <button
                    className="fso-blue-btn"
                    data-cy-test="ask-question-btn"
                    onClick={() => {
                        handleNewQuestion(isTokenValid);
                    }}>
                    Ask a Question
                </button>
            </div>
            <div className="fso-space-between fso-right-padding">
                <div id="question-count" data-cy-test="question-count">
                    {qcnt} questions
                </div>
                <div className="fso-order-btns">
                    {["Newest", "Active", "Unanswered"].map((m, idx) => (
                        <OrderButton key={idx} message={m} setQuestionOrder={setQuestionOrder} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;

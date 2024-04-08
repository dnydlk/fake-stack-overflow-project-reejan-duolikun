import "./index.css";

// Header for the Answer page
const AnswerHeader = ({ ansCount, title, handleNewQuestion, views, meta }) => {
    console.log("🚀 ~ AnswerHeader ~ ansCount:", ansCount)
    return (
        <div id="answersHeader" className="fso-right-padding">
            {/*//- Question title */}
            <div className=" fso-space-between">
                <div className="fso-bold-title fso-answer-question-title ">{title}</div>
                {/*//- Ask a Question button  */}
                <button
                    className="fso-blue-btn"
                    onClick={() => {
                        handleNewQuestion();
                    }}>
                    Ask a Question
                </button>
            </div>
            <div className="d-flex">
                {/*//- Asked (question ask date) */}
                <div className="fso-answer-title-detail me-1">Asked</div>
                <div className="fso-answer-title-detail-text me-2">{meta}</div>
                {/*//- View Count */}
                <div className="fso-answer-title-detail me-1">Viewed</div>
                <div className="fso-answer-title-detail-text">{views} times</div>
            </div>
        </div>
    );
};

export default AnswerHeader;

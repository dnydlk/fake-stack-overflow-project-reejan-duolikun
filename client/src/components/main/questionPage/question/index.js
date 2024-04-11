import { getMetaData } from "../../../../tool";
import "./index.css";

const Question = ({ q, clickTag, handleAnswer }) => {
    return (
      <div
        className="fso-question fso-right-padding"
        onClick={() => {
          handleAnswer(q._id);
        }}>
        <div className="fso-post-stats me-2" data-cy-test="post-stats">
          <div>{q.answers.length || 0} answers</div>
          <div>{q.views} views</div>
        </div>
        <div className="fso-question-mid">
          <div className="fso-post-title" data-cy-test="post-title">
            {q.title}
          </div>
          <div className="fso-question-tags" data-cy-test="question-tags">
            {q.tags.map((tag, idx) => {
              return (
                <button
                  key={idx}
                  className="fso-question-tag-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clickTag(tag.name);
                  }}>
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="fso-last-activity me-2" data-cy-test="last-activity">
          <div className="fso-question-author">{q.asked_by}</div>
          <div>&nbsp;</div>
          <div className="fso-question-meta">asked {getMetaData(new Date(q.ask_date_time))}</div>
        </div>
      </div>
    );
};

export default Question;

import { getMetaData } from "../../../../tool";
import "./index.css";

const Question = ({ q, clickTag, handleAnswer }) => {
    return (
      <div
        className="fso-question fso-right-padding"
        data-cy-test="question"
        onClick={() => {
          handleAnswer(q._id);
        }}>
        <div className="fso-post-stats me-2" data-cy-test="post-stats">
          <div>
            {q.answers.length} {q.answers.length === 0 || q.answers.length === 1 ? "answer" : "answers"}
          </div>

          <div>
            {q.views} {q.views === 0 || q.views === 1 ? "view" : "views"}
          </div>
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
          <div className="fso-question-author">{q.asked_by.username}</div>
          <div>&nbsp;</div>
          <div className="fso-question-meta">asked {getMetaData(new Date(q.ask_date_time))}</div>
        </div>
      </div>
    );
};

export default Question;

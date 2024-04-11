import { useEffect, useState } from "react";
import "./index.css";
import { getQuestionsByFilter } from "../../../services/questionService";
import QuestionHeader from "./header";
import Question from "./question";

const QuestionPage = ({
    title_text = "All Questions",
    order,
    search,
    setQuestionOrder,
    clickTag,
    handleAnswer,
    handleNewQuestion,
}) => {

    const [qlist, setQlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionsByFilter(order, search);
            setQlist(res || []);
        };

        fetchData().catch((e) => console.log(e));
    }, [order, search]);

    return (
        <>
            {/*//- Question Header */}
            <QuestionHeader
                title_text={title_text}
                qcnt={qlist.length}
                setQuestionOrder={setQuestionOrder}
                handleNewQuestion={handleNewQuestion}
            />
            {/*//- Question List */}
            <div id="question_list" className="question_list">
                {qlist.map((q, idx) => (
                    <Question q={q} key={idx} clickTag={clickTag} handleAnswer={handleAnswer} />
                ))}
            </div>
            {title_text === "Search Results" && !qlist.length && (
                <div className="bold_title fso-right-padding">No Questions Found</div>
            )}
        </>
    );
};
export default QuestionPage;
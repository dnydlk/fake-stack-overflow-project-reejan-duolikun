import { useState } from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import { validateHyperlink } from "../../../tool";
import { addAnswer } from "../../../services/answerService";

const NewAnswer = ({ qid, handleAnswer, currentUser }) => {
    const [userName, setUserName] = useState(currentUser?.username || "");
    const [answerText, setAnswerText] = useState("");
    const [userNameErr, setUserNameErr] = useState("");
    const [answerTextErr, setAnswerTextErr] = useState("");

    const postAnswer = async () => {
        setUserNameErr("");
        setAnswerTextErr("");

        let isValid = true;
        if (!userName) {
            setUserNameErr("Username cannot be empty");
            isValid = false;
        }
        if (!answerText) {
            setAnswerTextErr("Answer text cannot be empty");
            isValid = false;
        }
        // Hyperlink validation
        if (!validateHyperlink(answerText)) {
            setAnswerTextErr("Invalid hyperlink format.");
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        const answer = {
            text: answerText,
            ans_by: userName,
            ans_date_time: new Date(),
        };

        const res = await addAnswer(qid, answer);
        if (res && res._id) {
            handleAnswer(qid);
        }
    };
    return (
        <Form>
            <Input
                title={"Username"}
                id={"answerUsernameInput"}
                val={userName}
                setState={setUserName}
                err={userNameErr}
            />
            <Textarea
                title={"Answer Text"}
                id={"answerTextInput"}
                val={answerText}
                setState={setAnswerText}
                err={answerTextErr}
            />
            <div className="fso-btn-indicator-container">
                <button
                    className="fso-form-post-button"
                    data-cy-test="answer-page-post-answer-button"
                    onClick={() => {
                        postAnswer();
                    }}>
                    Post Your Answer
                </button>
                <div className="fso-mandatory-indicator">* indicates mandatory fields</div>
            </div>
        </Form>
    );
};

export default NewAnswer;

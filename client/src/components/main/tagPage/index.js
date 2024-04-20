import { useEffect, useState } from "react";
import "./index.css";
import Tag from "./tag";
import * as tagService from "../../../services/tagService";

const TagPage = ({ clickTag, handleNewQuestion, currentUser }) => {
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await tagService.getTagsWithQuestionNumber();
            setTagList(res || []);
        };

        fetchData().catch((e) => console.log(e));
    }, []);
    return (
        <>
            <div className="fso-space-between fso-right-padding">
                <div className="fso-bold-title">{tagList.length} Tags</div>
                <div className="fso-bold-title">All Tags</div>
                <button
                    className="fso-blue-btn"
                    onClick={() => {
                        handleNewQuestion(currentUser);
                    }}>
                    Ask a Question
                </button>
            </div>
            <div className="fso-tag-list fso-right-padding">
                {tagList.map((t, idx) => (
                    <Tag key={idx} t={t} clickTag={clickTag} />
                ))}
            </div>
        </>
    );
};

export default TagPage;

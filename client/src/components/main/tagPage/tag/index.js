import "./index.css";

const Tag = ({ t, clickTag }) => {
    return (
        <div
            className="fso-tag-node"
            onClick={() => {
                clickTag(t.name);
            }}
        >
            <div className="fso-tag-name">{t.name}</div>
            <div>{t.qcnt} questions</div>
        </div>
    );
};

export default Tag;

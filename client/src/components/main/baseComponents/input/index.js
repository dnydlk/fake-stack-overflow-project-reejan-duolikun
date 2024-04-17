import "./index.css";

const Input = ({ title, hint, id, mandatory = true, val, setState, err }) => {
    return (
        <>
            <div className="fso-input-title">
                {title}
                {mandatory ? "*" : ""}
            </div>
            {hint && <div className="fso-input-hint">{hint}</div>}
            <input
                id={id}
                className="fso-input-input"
                type="text"
                value={val}
                onInput={(e) => {
                    setState(e.target.value);
                }}
            />
            {err && <div className="fso-input-error">{err}</div>}
        </>
    );
};

export default Input;

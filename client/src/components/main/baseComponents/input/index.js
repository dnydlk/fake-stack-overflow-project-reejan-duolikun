import "./index.css";

const Input = ({ title, hint, id, mandatory = true, val, setState, err }) => {
    return (
        <>
            <div className="fso-input-title" data-cy-test="fso-input-title">
                {title}
                {mandatory ? "*" : ""}
            </div>
            {hint && (
                <div className="fso-input-hint" data-cy-test="fso-input-hint">
                    {hint}
                </div>
            )}
            <input
                id={id}
                className="fso-input-input"
                data-cy-test="fso-input-input"
                type="text"
                value={val}
                onChange={(e) => {
                    setState(e.target.value);
                }}
            />
            {err && (
                <div className="fso-input-error" data-cy-test="fso-input-error">
                    {err}
                </div>
            )}
        </>
    );
};

export default Input;

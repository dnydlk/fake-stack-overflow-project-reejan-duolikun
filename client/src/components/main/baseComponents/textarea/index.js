import "../input/index.css";

const Textarea = ({
    title,
    mandatory = true,
    hint,
    id,
    val,
    setState,
    err,
}) => {
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
            <textarea
                id={id}
                className="fso-input-input"
                data-cy-test="fso-input-input"
                type="text"
                value={val}
                onInput={(e) => {
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

export default Textarea;

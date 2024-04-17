import "./index.css";

const Form = ({ children }) => {
    return (
        <div className="fso-form" data-cy-test="fso-form">
            {children}
        </div>
    );
};

export default Form;

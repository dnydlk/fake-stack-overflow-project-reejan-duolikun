import "./index.css";

const OrderButton = ({ message, setQuestionOrder }) => {
    return (
        <button
            className="fso-order-btn"
            data-cy-test={`order-btn-${message}`}
            onClick={() => {
                setQuestionOrder(message);
            }}>
            {message}
        </button>
    );
};

export default OrderButton;

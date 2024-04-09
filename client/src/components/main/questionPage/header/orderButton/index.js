import "./index.css";

const OrderButton = ({ message, setQuestionOrder }) => {
    return (
        <button
            className="fso-order-btn"
            onClick={() => {
                setQuestionOrder(message);
            }}>
            {message}
        </button>
    );
};

export default OrderButton;

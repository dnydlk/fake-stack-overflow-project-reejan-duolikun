import { REACT_APP_API_URL, api } from "./config";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;

// To get Questions by Filter
const getQuestionsByFilter = async (order = "newest", search = "") => {
    const response = await api.get(`${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`);
    return response.data;
};

// To get Questions by id
const getQuestionById = async (qid) => {
    const response = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`);
    return response.data;
};

// To add Questions
const addQuestion = async (q) => {
    const response = await api.post(`${QUESTION_API_URL}/addQuestion`, q);
    return response.data;
};

export { getQuestionsByFilter, getQuestionById, addQuestion };

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

const flagQuestion = async (ids) => {
    const response = await api.patch(`${QUESTION_API_URL}/flagQuestion`, ids);
    return response.data;
};

const getFlaggedQuestion = async () => {
    const response = await api.get(`${QUESTION_API_URL}/getFlaggedQuestions`);
    return response.data;
};

const deleteQuestion = async (qid) => {
    const response = await api.delete(`${QUESTION_API_URL}/deleteQuestion/${qid}`);
    return response.data;
};

export { getQuestionsByFilter, getQuestionById, addQuestion, flagQuestion, getFlaggedQuestion, deleteQuestion };

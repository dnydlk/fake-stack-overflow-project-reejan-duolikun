import { REACT_APP_API_URL, api } from "./config";

const ANSWER_API_URL = `${REACT_APP_API_URL}/answer`;
const Vote_API_URL = `${REACT_APP_API_URL}/vote`;

// To add answer
const addAnswer = async (qid, ans) => {
    const data = { qid: qid, ans: ans };
    const respond = await api.post(`${ANSWER_API_URL}/addAnswer`, data);
    return respond.data;
};

// To vote
const vote = async (userId, answerId, voteType) => {
    const data = { userId, answerId, voteType };
    try {
        const response = await api.post(`${Vote_API_URL}/`, data);
        return response.data;
    } catch (error) {
        console.error("Vote API error:", error.response ? error.response.data : error.message);
        throw new Error("Failed to process the vote. Please try again.");
    }
};

// To get current votes
const fetchCurrentVotes = async (answerId) => {
    try {
        const response = await api.get(`${Vote_API_URL}/current-vote`, { params: { answerId } });
        return response.data;
    } catch (error) {
        console.error("Fetch current votes error:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch current votes. Please try again.");
    }
};

export {
    addAnswer, vote,
    // fetchVoteStatus,
    fetchCurrentVotes
};

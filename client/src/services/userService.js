import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// To register
const registerUser = async (user) => {
    const res = await api.post(`${USER_API_URL}/registerUser`, user);
    return res;
};

// To login
const loginUser = async (user) => {
    const res = await api.post(`${USER_API_URL}/loginUser`, user);
    return res;
};

// Get user info
const getUserInfo = async (userId) => { 
    const res = await api.get(`${USER_API_URL}/get-user-info/${userId}`);
    return res.data;
}

export { registerUser, loginUser, getUserInfo};
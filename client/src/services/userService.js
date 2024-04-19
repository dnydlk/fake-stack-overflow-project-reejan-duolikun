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

// To post user info
const updateUserInfo = async (user) => {
    const res = await api.post(`${USER_API_URL}/updateUser`, user);
    return res;
}

export { registerUser, loginUser, updateUserInfo};
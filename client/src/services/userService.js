import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// To register
const registerUser = async (user) => {
    const response = await api.post(`${USER_API_URL}/registerUser`, user);
    return response;
};

// To login
const loginUser = async (user) => {
    const response = await api.post(`${USER_API_URL}/loginUser`, user);
    return response;
};

// To logout
const logoutUser = async () => {
    const response = await api.post(`${USER_API_URL}/loginUser`);
    return response.data;
};

// Get user info
const getUserInfo = async (userId) => { 
    const response = await api.get(`${USER_API_URL}/get-user-info/${userId}`);
    return response.data;
}

// fetch Cookies
const fetchCookies = async () => {
    const response = await api.get(`${USER_API_URL}/fetch-cookies`);
    return response.data;
}

const checkAuthentication = async () => {
    try {
        const response = await api.get(`${USER_API_URL}/validate-token`);
        return response.data;
    } catch (error) {
        console.error("Failed to validate token", error);
        return { authenticated: false };
    }
}

export { registerUser, loginUser, getUserInfo, fetchCookies, logoutUser, checkAuthentication };
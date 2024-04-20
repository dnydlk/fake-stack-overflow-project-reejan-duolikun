import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// To register
const signup = async (user) => {
    const response = await api.post(`${USER_API_URL}/register`, user);
    return response;
};

// To login
const login = async (user) => {
    const response = await api.post(`${USER_API_URL}/login`, user);
    return response;
};

// To logout
const logout = async () => {
    const response = await api.post(`${USER_API_URL}/logout`);
    return response.data;
};

// Get user info
const getCurrentUser = async () => {
    try {
        const response = await api.get(`${USER_API_URL}/get-user-info`);
        return response.data;
    } catch (error) {
        console.error("Failed to get user info", error);
        return { authenticated: false };
    }
};

const checkAuthentication = async () => {
    try {
        const response = await api.get(`${USER_API_URL}/validate-token`);
        return response.data;
    } catch (error) {
        console.error("Failed to validate token", error);
        return { authenticated: false };
    }
};

const updateUserInfo = async (user) => {
    const response = await api.put(`${USER_API_URL}/update-user-info`, user);
    return response.data;
};

export { signup, login, getCurrentUser, logout, checkAuthentication, updateUserInfo };

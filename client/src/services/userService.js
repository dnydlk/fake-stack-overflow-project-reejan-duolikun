import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// To register
const registerUser = async (user) => {
    const res = await api.post(`${USER_API_URL}/registerUser`, user);
    return res;
};

export { registerUser };
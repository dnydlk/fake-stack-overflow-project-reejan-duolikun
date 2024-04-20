import React, { createContext, useState, useEffect } from "react";
import * as userService from "../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    // Adding a loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateAuthentication = async () => {
            setLoading(true);
            try {
                const authResponse = await userService.checkAuthentication();
                if (authResponse.authenticated) {
                    setToken(authResponse.token); 
                } else {
                    setToken(null);
                }
            } catch (error) {
                console.log("Error during authentication check: ", error);
                setToken(null);
            }
            setLoading(false);
        };
        validateAuthentication();
    }, []);

    const logoutUser = async () => {
        try {
            const response = await userService.logoutUser();
            if (response.status === 200) {
                setToken(null);
            }
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    };

    return <AuthContext.Provider value={{ token, setToken, loading, logoutUser }}>{children}</AuthContext.Provider>;
};

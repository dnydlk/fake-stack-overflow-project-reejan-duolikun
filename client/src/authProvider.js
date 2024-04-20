import React, { createContext, useState, useEffect } from "react";
import * as userService from "./services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateAuthentication = async () => {
            setLoading(true);
            try {
                const response = await userService.checkAuthentication();
                if (response.authenticated) {
                    setIsTokenValid(response.authenticated); 
                } else {
                    setIsTokenValid(null);
                }
            } catch (error) {
                console.log("Error during authentication check: ", error);
                setIsTokenValid(null);
            }
            setLoading(false);
        };
        validateAuthentication();
    }, []);

    return <AuthContext.Provider value={{ isTokenValid, setIsTokenValid, loading }}>{children}</AuthContext.Provider>;
};

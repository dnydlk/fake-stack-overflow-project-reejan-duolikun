import "./index.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider";
import * as userService from "../../services/userService";

const Header = ({ search, setQuestionPage }) => {
    const [value, setValue] = useState(search);
    const { isTokenValid, setIsTokenValid } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setIsTokenValid(null);
        userService.logout();
        navigate("/");
    };

    // const handleProfile = () => {
    //     navigate('/profile');
    // }
    
    return (
        <div id="fso-header" className="fso-header d-flex align-items-center justify-content-around">
            {/*//- Image of Stack Overflow */}
            <img
                src="logo_stack_overflow.png"
                alt="icon of fake stack overflow"
                className="fso-logo mb-2"
                data-cy-test="logo"
            />

            {/*//- Search bar */}
            <input
                id="searchBar"
                data-cy-test="search-bar"
                className="form-control w-75 me-2"
                placeholder="Search ..."
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        setQuestionPage(e.target.value, "Search Results");
                    }
                }}
            />

            <div>
                {isTokenValid ? (
                    // <div id="fso-user-profile" className="m-1" data-cy-test="user-profile">
                    //     <button className="fso-user-profile" onClick={handleProfile}>
                    //         Profile
                    //     </button>
                    // </div>
                    <div>
                        <button className="logout-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    // Display login button if not logged in
                    <button className="login-button" onClick={handleLogin}>
                        Log In
                    </button>
                )}
            </div>
            {/* {isTokenValid && (
                // Display logout button if logged in
                <div>
                    <button className="logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )} */}
        </div>
    );
};
export default Header;

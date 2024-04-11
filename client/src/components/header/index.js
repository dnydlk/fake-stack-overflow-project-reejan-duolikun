import "./index.css";
import React, { useState } from "react";

const Header = ({ search, setQuestionPage }) => {
    // set the value of the search bar to the search state
    const [value, setValue] = useState(search);

    return (
        <div id="fso-header" className="fso-header d-flex align-items-center justify-content-around">
            {/*//- Image of Stack Overflow */}
            <img src="logo_stack_overflow.png" alt="icon of fake stack overflow" className="fso-logo mb-2" data-cy-test="logo" />

            {/*//- Search bar */}
            {/* todo: adjust the width in css? */}
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

            {/*//- User profile placeholder */}
            <div id="fso-user-profile" className="m-1" data-cy-test="user-profile">
                <h2>user</h2>
            </div>
        </div>
    );
};
export default Header;

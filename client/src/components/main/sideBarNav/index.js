import "./index.css";
import React from "react";

const SideBarNav = ({ selected = "", handleQuestions, handleTags, handleProfile }) => {
    return (
        <div id="sideBarNav" className="fso-sideBarNav d-flex flex-column align-items-center">
            <div
                id="menu-profile"
                data-cy-test="nav-profile"
                className={`fso-menu-button ${selected === "p" ? "fso-menu-selected" : ""}`}
                onClick={() => {
                    handleProfile();
                }}>
                Profile
            </div>
            <div
                id="menu-question"
                data-cy-test="nav-question"
                className={`fso-menu-button ${selected === "q" ? "fso-menu-selected" : ""}`}
                onClick={() => {
                    handleQuestions();
                }}>
                Questions
            </div>
            <div
                id="menu-tag"
                data-cy-test="nav-tag"
                className={`fso-menu-button ${selected === "t" ? "fso-menu-selected" : ""}`}
                onClick={() => {
                    handleTags();
                }}>
                Tags
            </div>
        </div>
    );
};
export default SideBarNav;

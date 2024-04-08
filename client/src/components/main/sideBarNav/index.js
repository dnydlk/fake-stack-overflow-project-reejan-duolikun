import "./index.css";
import React from "react";


const SideBarNav = ({ selected = "", handleQuestions, handleTags }) => {
    return (
        <div id="sideBarNav" className="fso-sideBarNav d-flex flex-column align-items-center">
            <div
                id="menu_question"
                className={`fso-menu_button ${selected === "q" ? "menu_selected" : ""}`}
                onClick={() => {
                    handleQuestions();
                }}>
                    Questions
            </div>
            <div
                id="menu_tag"
                className={`fso-menu_button ${selected === "q" ? "menu_selected" : ""}`}
                onClick={() => {
                    handleTags();
                }}>
                Tags
            </div>
        </div>
    );
};
export default SideBarNav;

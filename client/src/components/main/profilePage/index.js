import React, { useState } from "react";
import Profile from "./profile";
import Activities from "./activities";

const ProfilePage = ({ currentPage = "profile", currentUser, setCurrentUser }) => {
    const [page, setPage] = useState(currentPage);

    const [pageText, setPageText] = useState("Your Profile");

    const [buttonText, setButtonText] = useState("Activities");

    let content = null;

    const handleActivities = () => {
        if (buttonText === "Activities") {
            setPage("activities");
            setPageText("Your Activities");
            setButtonText("Profile");
            return;
        } else {
            setPage("profile");
            setButtonText("Activities");
        }
    };

    switch (page) {
        case "profile": {
            content = <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />;
            break;
        }
        case "activities": {
            content = <Activities currentUser={currentUser} />;
            break;
        }
    }

    return (
        <div id="user-profile">
            <div className="fso-space-between fso-right-padding">
                <div className="fso-bold-title">{pageText}</div>
                <button className="fso-blue-btn" onClick={handleActivities}>
                    {buttonText}
                </button>
            </div>
            <hr />
            <div className="container m-1">{content}</div>
        </div>
    );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import Profile from "./profile";
import Activities from "./activities";
import * as userService from "../../../services/userService";
import Moderation from "./moderation";

const ProfilePage = ({ currentUser, setCurrentUser, clickTag, handleAnswer }) => {
	const [page, setPage] = useState(currentUser.role && currentUser.role === "user" ? "profile" : "moderation");
	console.log("🚀 ~ ProfilePage ~ page:", page);

	const [pageText, setPageText] = useState(currentUser.role === "user" ? "Your Profile" : "Moderation");

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

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				console.log("🚀 ~ fetching CurrentUser");
				const user = await userService.getCurrentUser();
				setCurrentUser(user);
				console.log("🚀 ~ fetchCurrentUser ~ currentUser:", user);
			} catch (error) {
				console.error("Failed to get user info", error);
			}
		};
		fetchCurrentUser();
	}, []);

	switch (page) {
		case "profile": {
			content = <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />;
			break;
		}
		case "activities": {
			content = <Activities currentUser={currentUser} clickTag={clickTag} handleAnswer={handleAnswer} />;
			break;
		}
		case "moderation": {
			content = <Moderation currentUser={currentUser} handleAnswer={handleAnswer} />;
			break;
		}
	}

	return (
		<div id="user-profile">
			<div className="fso-space-between fso-right-padding">
				<div className="fso-bold-title">{pageText}</div>
				{currentUser.role === "user" && (
					<button className="fso-blue-btn" onClick={handleActivities} data-cy-test="activities">
						{buttonText}
					</button>
				)}
			</div>
			<hr />
			<div className="container m-1 pe-5">{content}</div>
		</div>
	);
};

export default ProfilePage;

import React, { useState } from "react";
import * as userService from "../../../services/userService";

const Profile = ({ currentUser, setCurrentUser }) => {
    const [username, setUsername] = useState(currentUser.username);
    const [location, setLocation] = useState(currentUser.location);
    const [title, setTitle] = useState(currentUser.title);
    const [aboutMe, setAboutMe] = useState(currentUser.aboutMe);
    const [link, setLink] = useState(currentUser.link);

    const handleUpdateProfile = async () => {
        const updatedUser = {
            ...currentUser,
            username,
            location,
            title,
            aboutMe,
            link,
        };
        setCurrentUser(updatedUser);
        const response = await userService.updateUserInfo(updatedUser);
        setCurrentUser(response);
    };

    return (
        <>
            <label htmlFor="displayname">Displayname</label>
            <input
                type="text"
                id="displayname"
                className="form-control w-50 mb-2"
                data-cy-test="displayname"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <label htmlFor="location">Location</label>
            <input
                type="text"
                id="location"
                className="form-control w-50 mb-2"
                data-cy-test="location"
                value={location}
                onChange={(e) => {
                    setLocation(e.target.value);
                }}
            />
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                className="form-control w-50 mb-2"
                data-cy-test="title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <label htmlFor="about-me">AboutMe</label>
            <input
                type="text"
                id="about-me"
                className="form-control w-50 mb-2"
                data-cy-test="about-me"
                value={aboutMe}
                onChange={(e) => {
                    setAboutMe(e.target.value);
                }}
            />
            <label htmlFor="link">Link</label>
            <input
                type="text"
                id="link"
                className="form-control w-50 mb-3"
                data-cy-test="link"
                value={link}
                onChange={(e) => {
                    setLink(e.target.value);
                }}
            />
            <button className="fso-blue-btn" onClick={() => handleUpdateProfile()} data-cy-test="update-profile-button">
                Update Profile
            </button>
        </>
    );
};

export default Profile;

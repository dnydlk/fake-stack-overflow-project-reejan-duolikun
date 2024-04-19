import React, { useState} from "react";
import "./index.css";
import Header from "../header";
import Main from "../main";

// Component for the Profile page
const Profile = () => {
  const [search, setSearch] = useState("");
  const [mainTitle, setMainTitle] = useState("Profile");

  const setQuestionPage = (search = "", title = "All Questions") => {
    setSearch(search);
    setMainTitle(title);
};

    return (
      <>
        <Header search={search} setQuestionPage={setQuestionPage} />
        <Main title={mainTitle} search={search} setQuestionPage={setQuestionPage} currentPage="profile"/>

      </>
    );
};

export default Profile;
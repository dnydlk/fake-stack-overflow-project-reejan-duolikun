import React, { useState} from "react";
import "./index.css";
import Header from "../header";
import SideBarNav from "../main/sideBarNav";

// Component for the Profile page
const Profile = () => {
  const [search, setSearch] = useState("")
  const [sideBarNav, setSideBar] = useState("")

  const setQuestionPage = (search = "", sideBar="") => {
    setSearch(search);
    setSideBar(sideBar);
    
};

    return (
      <>
        <Header search={search} setQuestionPage={setQuestionPage} />
        <SideBarNav sideBar={sideBarNav}/>

      </>
    );
};

export default Profile;
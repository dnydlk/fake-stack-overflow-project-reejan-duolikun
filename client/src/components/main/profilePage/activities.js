import React, { useEffect } from "react";

const Activities = ({ currentUser }) => {
    console.log("🚀 ~ Activities ~ currentUser:", currentUser);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ fetchCurrentUserActivities");
    }, []);

    return <></>;
};

export default Activities;

import React from "react";
import "../styles/styles.css";

const SideBarPanel = ({name, email, role}) => {

    return(
        <div className="sideBar">
            <div className="profile">
                <h4>{name}</h4>
                <p>{email}</p>
                <p>{role}</p>
            </div>
            <div className="tabs">
                <p>Dashboard</p>
                <p>My Classes</p>
            </div>
        </div>
    );
};

export default SideBarPanel;
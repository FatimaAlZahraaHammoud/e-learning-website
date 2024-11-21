import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/coursePage.css";


const Sidebar = ({ setActiveSection }) => {
    return (
        <div className="sidebar">
            <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
            <button onClick={() => setActiveSection("students")}>Students</button>
        </div>
    );
};

export default Sidebar;

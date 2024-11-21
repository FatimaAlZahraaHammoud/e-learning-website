import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/coursePage.css";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ setActiveSection }) => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
        try {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
        } catch (error) {
            console.error("Invalid token:", error);
        }
        }
    }, []);

    return (
        <div className="sidebar">
            {role === "instructor" && <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>}
            {role === "instructor" && <button onClick={() => setActiveSection("students")}>Students</button>}
            
            {role === "admin" && <button onClick={() => setActiveSection("students")}>Students</button>}
            {role === "admin" && <button onClick={() => setActiveSection("instructors")}>Instructors</button>}
            {role === "admin" && <button onClick={() => setActiveSection("courses")}>Courses</button>}
        </div>
    );
};

export default Sidebar;

import React, { useState } from "react";
import Sidebar from "../components/SidebarInstructor";
import Dashboard from "../components/Dashboard";
import Students from "../components/Students";
import { useParams } from "react-router-dom";
import "../styles/coursePage.css";

const CoursePage = () => {
    const { courseTitle } = useParams();
    const [activeSection, setActiveSection] = useState("dashboard");

    return (
        <div className="course-page">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="content">
                <h1>{courseTitle}</h1>
                {activeSection === "dashboard" && <Dashboard />}
                {activeSection === "posting" && <Posting />}
                {activeSection === "students" && <Students />}
            </div>
        </div>
    );
};

export default CoursePage;

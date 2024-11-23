import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Dashboard from "../components/instructor/Dashboard";
import Students from "../components/Students";
import { useParams } from "react-router-dom";
import "../styles/coursePage.css";
import axios from "axios";

const CoursePage = () => {
    const { courseId } = useParams();
    const [activeSection, setActiveSection] = useState("dashboard");
    const [courseTitle, setCourseTitle] = useState("");
    
    useEffect(() => {
        const fetchTitle = async() => {
            try{
                const data = new FormData();
                data.append("courseId", courseId)
                const respone = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/getCourseTitle.php", data);
                if (respone.data.status === "success"){
                    
                    setCourseTitle(respone.data.course_title.title);
                    console.log(courseTitle);
                }
                else{
                    console.log("error: ", respone.data.message);
                }
            }
            catch(error){
                console.log("Error fetching data", error);
            }
        }

        fetchTitle();
    }, [courseId]);

    return (
        <div className="course-page">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="content">
                <h1>{courseTitle}</h1>
                {activeSection === "dashboard" && <Dashboard course_id={courseId}/>}
                {activeSection === "students" && <Students />}
            </div>
        </div>
    );
};

export default CoursePage;

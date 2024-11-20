import React, {useState, useEffect} from "react";
import CourseCard from "./CourseCard";
import { requestApi } from "../utils/request";
import cardImage2 from "../assets/images/c++_course.png"
import "../styles/base/utilities.css";
import "../styles/style.css";
import axios from "axios";

const Courses = () => {

    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchSections = async () =>{
            try{
            
                const response = await axios.get("http://localhost/FSW-SE-Factory/e-learning-website/Server/getCourses.php");
                console.log(response.data);
                setSections(response.data);
            }
            catch(error){
                console.error("Error fetching data:", error);
            }
        }
        fetchSections();
    }, []);

    return (
        <div className="courses-container">
            {sections.map((section) => (
                <div key={section.id} className="course-section">
                    <h2 className="section-title">{section.title}</h2>
                    <div className="flex center wrap courses-grid">
                        {section.courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                cardImage={course.image}
                                courseTitle={course.title}
                                courseInstructor={course.instructor}
                                numberOfStudents={course.students}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Courses;
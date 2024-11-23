import React, {useState, useEffect} from "react";
import CourseCard from "../common/CourseCard";
import { requestApi } from "../../utils/request";
import "../../styles/base/utilities.css";
import "../../styles/style.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Courses = () => {

    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role; 

            const fetchCourses = async () =>{
                try{
                    let response;
                    if (role === "instructor"){
                        response = await axios.get("http://localhost/FSW-SE-Factory/e-learning-website/Server/getCoursesForInstructor.php", {
                            headers: {
                                Authorization: localStorage.token,
                            },
                        });
                    }
                    else if (role === "student"){

                    }
                    console.log(response.data);
                    setCourses(response.data);
                }
                catch(error){
                    console.error("Error fetching data:", error);
                }
            }
            fetchCourses();
        }
    }, []);

    return (
        <div className="courses-container">
            <div className="course-section">
                <h2 className="section-title">My Courses</h2>
                <div className="flex center wrap courses-grid">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            courseId = {course.id}
                            cardImage={course.image}
                            courseTitle={course.title}
                            courseInstructor={course.instructor}
                            numberOfStudents={course.students}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
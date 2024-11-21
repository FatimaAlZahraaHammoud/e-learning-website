import React, {useState, useEffect} from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";



const CourseCard = ({cardImage, courseTitle, courseInstructor , numberOfStudents, courseId}) => {
    const navigate = useNavigate();

    return (
        <div className="course-card"
            onClick={() =>{
                navigate(`/course/${courseId}`)
            }}
        >
            <div className="card-header">
                <img
                src={cardImage}
                alt="Course Thumbnail"
                className="course-image"
                />
            </div>
            <div className="card-body">
                <div className="title-like-container">
                    <h3 className="course-title">{courseTitle}</h3>
                </div>
                <p className="course-instructor">{courseInstructor}</p>
                <div className="card-footer">
                    <div className="students">({numberOfStudents})</div>
                </div>
                <button className="start-now-btn">View more</button>
            </div>
        </div>
    );
};

export default CourseCard;
import React, {useState, useEffect} from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";



const CourseCard = ({cardImage, courseTitle, courseInstructor , numberOfStudents}) => {
    const navigate = useNavigate();

    return (
        <div className="course-card"
            onClick={() =>{
                navigate(`/course/${courseTitle}`)
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart like-btn">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                </div>
                <p className="course-instructor">{courseInstructor}</p>
                <div className="card-footer">
                <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
                <div className="students">({numberOfStudents})</div>
                </div>
                <button className="start-now-btn">Start Now</button>
            </div>
        </div>
    );
};

export default CourseCard;
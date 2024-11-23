import React, {useState} from "react";
import heroImage from "../../assets/images/Hand coding-amico.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import "../../styles/style.css"
import {useNavigate} from "react-router-dom";

const HeroSection = () => {

    return(
        <div className="hero-section">
            <div className="hero-text">
                <h1>Unlock Your Coding Potential</h1>
                <h2>Find your first step!</h2>
                <p>Master coding with ease! Explore interactive courses, hands-on projects, and expert guidance to achieve your coding goals. Start building your future today!</p> 
                <div className="search-bar">
                    <input type="text" id="search" placeholder="Search for courses, topics, or tutorials..." />
                    <button className="search-icon-button" id="search-button">
                        <img className="search-icon" src={searchIcon} alt="Search" />
                    </button>
                </div>
                <button className="explore-btn">Explore Courses</button>
            </div>

            <div className="hero-image">
                <img src={heroImage} alt="e-learning image" />
            </div>
        </div>

    );
}

export default HeroSection;
import React, {useState} from "react";
import axios from "axios";
import "../../styles/base/base.css"
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return(
        <nav>
            <a><img src="" alt="" className="logo" /></a>
            <ul>
                <a href="#"><li>Home</li></a>
                <a href="#"><li>Courses</li></a>
                <a href="#"><li>Contact Us</li></a>
            </ul>
            <div className="navbar-btns">
                <button className="login"  onClick={() => navigate("/")}>Login</button>
                <button className="signup"  onClick={() => navigate("/signup")}>Signup</button>
            </div>
            
        </nav>
    )
}

export default Navbar;
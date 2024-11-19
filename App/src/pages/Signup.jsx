import React, {useState} from "react";
import axios from "axios";
import { requestApi } from "../utils/request";
import { requestMethods } from "../utils/enums/requestsMethod";
import "../styles/signup.css";
import {useNavigate} from "react-router-dom";

const Signup = () =>{
    const navigate = useNavigate();
    const [signupForm, setsignupForm] = useState("");
    const [error, setError] = useState("");

    return(
        <div className="signup-page">
            <div className="signup-section">
                <h2>Sign up</h2>
                <div className="start-form">
                    <label htmlFor="username">Username: </label>
                    <input type="text" placeholder="Enter your name" id="username" required
                        onChange={(e) =>{
                            setsignupForm((prev) =>{
                                return{
                                    ...prev,
                                    username: e.target.value
                                };
                            });
                        }}  
                    />
                    <label htmlFor="email">Email: </label>
                    <input type="email" placeholder="Enter your email" id="email" required
                        onChange={(e) =>{
                            setsignupForm((prev) =>{
                                return{
                                    ...prev,
                                    email: e.target.value
                                };
                            });
                        }}  
                    />
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Enter password" id="password" required
                        onChange={(e) =>{
                            setsignupForm((prev) =>{
                                return{
                                    ...prev,
                                    password: e.target.value
                                };
                            });
                        }} 
                    />
                    <button className="signup-btn"
                        onClick={async() => {
                            setError("");
                            try{
                                const result = await requestApi({
                                    body:{
                                        username : signupForm.username,
                                        email : signupForm.email,
                                        password : signupForm.password
                                    },
                                    method: requestMethods.POST,
                                    route: '/signup'
                                })
                                localStorage.setItem("token", result.access_token);
                                navigate("/Home");
                            }
                            catch(error){
                                setError("Something error happened");
                            };
                        }}
                    >
                    Register
                    </button>
                    <p className="login-text">Already have an account? <button onClick={() => navigate("/")} className="login-link" type="button">Login</button></p>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Signup;
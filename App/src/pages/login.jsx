import React, {useState} from "react";
import axios from "axios";
import "../styles/base/utilities.css"
import { requestApi } from "../utils/request";
import {requestMethods} from "../utils/enums/requestsMethod";
import "../styles/login.css"
import {useNavigate} from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState("");
    const [error, setError] = useState("");

    return(
        <div className="login-page">
            <div className="login-section">
                <h2>Sign In</h2>
                <div className="start-form">
                    <label htmlFor="email">Email: </label>
                    <input type="email" placeholder="Enter your email" id="email" required
                        onChange={(e) =>{
                            setLoginForm((prev) =>{
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
                            setLoginForm((prev) =>{
                                return{
                                    ...prev,
                                    password: e.target.value
                                };
                            });
                        }} 
                    />
                    <button className="login-btn"
                        onClick={async () => {
                            setError("");
                            try{
                                const result = await requestApi({
                                    body: {
                                      email: loginForm.email,
                                      password: loginForm.password,
                                    },
                                    method: requestMethods.POST,
                                    route: "/login",
                                });
                                localStorage.setItem("token", result.access_token);
                                navigate("/home");
                            }
                            catch (error) {
                                console.log("something wrong happend");
                            }
                        }}
                    >
                    Login
                    </button>
                    <p className="signup-text">Don't have an account? <a onClick={() => {navigate("/signup");}} className="signup-link">Signup</a></p>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Login;
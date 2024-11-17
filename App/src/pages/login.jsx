import React, {useState} from "react";
import axios from "axios";
import imagePath from "../images/e-learning3.png";
import "../styles/base/utilities.css"
import "../styles/login.css"
import {useNavigate} from "react-router-dom";

const Login = () =>{
    //const navigate = useNavigate();
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
                        onClick={() => {
                            setError("");
                            const data = new FormData();
                            data.append("email", loginForm.email);
                            data.append("password", loginForm.password);
                            axios.post("http://localhost/FSW-SE-Factory/e_learning_website/Server/login.php", data).then((res)=>{
                                localStorage.setItem("userId", res.data.UserId);
                                //navigate("/Home");
                            }).catch((error) =>{
                                setError(error.response.data.status);
                            })
                        }}
                    >
                    Login
                    </button>
                    <p className="signup-text">Don't have an account? <a href="/signup" className="signup-link">Signup</a></p>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Login;
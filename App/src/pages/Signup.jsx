import React, {useState} from "react";
import axios from "axios";
import "../styles/signup.css";
import {useNavigate} from "react-router-dom";

const Signup = () =>{
    //const navigate = useNavigate();
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
                        onClick={() => {
                            setError("");
                            const data = new FormData();
                            data.append("username", signupForm.username);
                            data.append("email", signupForm.email);
                            data.append("password", signupForm.password);
                            axios.post("http://localhost/FSW-SE-Factory/e_learning_website/Server/signup.php", data).then((res)=>{
                                localStorage.setItem("userId", res.data.UserId);
                                //navigate("/Home");
                            }).catch((error) =>{
                                setError(error.response.data.status);
                            })
                        }}
                    >
                    Register
                    </button>
                    <p className="login-text">Already have an account? <a href="/login" className="login-link">Login</a></p>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Signup;
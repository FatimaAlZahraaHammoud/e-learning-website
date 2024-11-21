import axios from "axios";
import React, { useState } from "react";

const Posting = ({courseId}) => {

    const [selectedForm, setSelectedForm] = useState("");
    const [announcement, setAnnouncement] = useState({title:"", content:""});
    const [assignment, setAssignment] = useState({ title: "", description: "", dueDate: "" });


    const handlePostAnnouncement = async() => {
        try{
            const data = new FormData();
            data.append("title", announcement.title);
            data.append("content", announcement.content);
            data.append("course_id", courseId);
            const response = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/createAnnouncement.php", data, {
                headers: localStorage.token
            });

            if(response.data.status === "success"){
                console.log("posted successfully");
                setSelectedForm("");
                setAnnouncement({title: "", content: ""});
            }
        }
        catch(error){
            console.error("Error posting announcement:", error);
        } 
    }

    const handlePostAssignment = async() => {
        try{
            const data = new FormData();
            data.append("title", assignment.title);
            data.append("description", assignment.description);
            data.append("dueDate", assignment.dueDate);
            data.append("course_id", courseId);
            const response = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/createAnnouncement.php", data, {
                headers: localStorage.token
            });

            if(response.data.status === "success"){
                console.log("posted successfully");
                setSelectedForm("");
                setAssignment({title: "", description: "", dueDate: ""});
            }
        }
        catch(error){
            console.error("Error posting assignment:", error);
        }
    }

    

    return(
        <div className="posting-container">
            <div className="posting-header"> 
                <h2>Post Conetnt</h2>
                <div className="add-icons">
                    <div className="add-item" onClick={() => setSelectedForm("announcement")}>
                        ➕ Add Announcement
                    </div>
                    <div className="add-item" onClick={() => setSelectedForm("assignment")}>
                        ➕ Add Assignement
                    </div>
                </div>
            </div>

            
            <div className="form-container">
                {selectedForm === "announcement" && (
                    <form className="announcement" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePostAnnouncement();
                        }}
                    >
                        <h3>Add Announcement</h3>
                        <input type="text" placeholder="title" value={announcement.title} required onChange={(e) => {
                            setAnnouncement((prev) => {
                                return {
                                    ...prev, 
                                    title: e.target.value
                                }
                            });
                        }}/>

                        <textarea placeholder="content" value={announcement.content} required onChange={(e) => {
                            setAnnouncement((prev) => {
                                return {
                                    ...prev, 
                                    content: e.target.value
                                }
                            });
                        }}></textarea>
                        <button >Cancel</button>
                        <button type="submit">Post Announcement</button>
                    </form>
                )};

                {selectedForm === "assignment" && (
                    <form className="assignment-form" 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePostAssignment();
                        }}
                    >
                        <h3>Add Assignment</h3>
                        <input type="text" placeholder="title" required value={announcement.title}
                            onChange={(e) => {
                                setAssignment((prev) =>{
                                    return{
                                        ...prev,
                                        title: e.target.value
                                    }
                                })
                            }}
                        />
                        <textarea placeholder="Description" required value={assignment.description}
                            onChange={(e) => {
                                setAssignment((prev) =>{
                                    return{
                                        ...prev, 
                                        description: e.target.value
                                    }
                                })
                            }}
                        ></textarea>
                        <input type="date" required value={assignment.dueDate}
                            onChange={(e) => {
                                setAssignment((prev) =>{
                                    return{
                                        ...prev,
                                        dueDate: e.target.value
                                    }
                                })
                            }}
                        />

                        <button >Cancel</button>
                        <button type="submit">Post Announcement</button>
                    </form>
                )}
            </div>
        </div>

    )
};

export default Posting;
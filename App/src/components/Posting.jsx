import React, { useState } from "react";

const Posting = ({courseId}) => {

    const [selectedForm, setSelectedForm] = useState("");
    const [announcement, setAnnouncement] = useState({title:"", content:""});
    const [assignment, setAssignment] = useState({ title: "", description: "", dueDate: "" });


    

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
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
                    <form className="announcement" >

                    </form>
                )}
            </div>
        </div>

    )
}
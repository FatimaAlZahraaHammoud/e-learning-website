import React, {useState, useRef} from "react";
import "../styles/base/utilities.css";
import "../styles/dialog.css";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const AddAnnouncementDialog = ({onClose, onSave, courseId}) => {

    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!title || !content){
            setError("Add all fields");
            return;
        }

        try{
            const data = new FormData();
            data.append("title", title);
            data.append("content", content);
            data.append("course_id", courseId);
            const response = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/createAnnouncement.php", data, {
                headers: localStorage.token
            });

            if(response.data.status === "success"){
                onSave({title, content});
                setTitle("");
                setContent("");
                setError("");
            }
        }
        catch(error){
            console.error("Error posting announcement:", error);
        } 
    }

    return (
        <dialog className="dialog" open>
            <div className="dialog-content">
                <h3>Add Announcement</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} required onChange={(e) => setTitle(e.target.value)}/>
                    <textarea placeholder="Context" value={content} required onChange={(e) => setContent(e.target.value)}></textarea>
                    <div className="form-buttons">
                        <button type="button" onClick={() => {
                            onClose;
                            setError("");
                        }}>Cancel</button>
                        <button type="submit" onClick={() =>{
                            onSave;
                            setError("");
                        }}>Submit</button>
                    </div>
                </form>
                {error && <p>{error}</p>}
            </div>
        </dialog>
    );
};

export default AddAnnouncementDialog;

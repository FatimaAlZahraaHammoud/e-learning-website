import React, {useState, useRef} from "react";
import "../styles/base/utilities.css";
import "../styles/dialog.css";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const AddAssignmentsDialog = ({onClose, onSave, courseId}) => {

    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!title || !description || !dueDate){
            setError("Add all fields");
            return;
        }

        const currentDate = new Date().toISOString();

        try{
            const data = new FormData();
            data.append("title", title);
            data.append("description", description);
            data.append("dueDate", dueDate);
            data.append("course_id", courseId);
            data.append("currentDate", currentDate);
            const response = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/createAssignment.php", data, {
                headers:
                {
                    Authorization: localStorage.token
                }
            });

            if(response.data.status === "success"){
                onSave({title, description, due_date: dueDate, created_at: currentDate});
                setTitle("");
                setDescription("");
                setDueDate("");
                setError("");
                onClose();
            }
        }
        catch(error){
            console.error("Error posting assignment:", error);
        }
    }

    return (
        <dialog className="dialog" open>
            <div className="dialog-content">
                <h3>Add Announcement</h3>
                <div className="dialog-details">
                    <input type="text" placeholder="title" required value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    <div className="form-buttons">
                    <button className="cancel-button" type="button" onClick={() => {
                            onClose();
                            setError("");
                        }}>Cancel</button>
                        <button onClick={handleSubmit} className="submit-button">Submit</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </dialog>
    );
};

export default AddAssignmentsDialog;

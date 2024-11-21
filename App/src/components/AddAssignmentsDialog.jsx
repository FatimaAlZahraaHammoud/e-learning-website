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

        try{
            const data = new FormData();
            data.append("title", title);
            data.append("description", description);
            data.append("dueDate", dueDate);
            data.append("course_id", courseId);
            const response = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/createAssignment.php", data, {
                headers: localStorage.token
            });

            if(response.data.status === "success"){
                onSave({title, description, dueDate});
                setTitle("");
                setDescription("");
                setDueDate("");
                setError("");
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
                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder="title" required value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    <div className="form-buttons">
                        <button type="button" onClick={() => {
                            onClose();
                            setError("");
                        }}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </dialog>
    );
};

export default AddAssignmentsDialog;

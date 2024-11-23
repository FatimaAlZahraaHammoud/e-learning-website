import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css"
import AddAnnouncementDialog from "./AddAnnouncementDialog";
import AddAssignmentsDialog from "./AddAssignmentsDialog";

const Dashboard = ({course_id}) => {
    const [announcements, setAnnouncementS] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try{
                const data = new FormData();
                data.append("course_id", course_id);
                const announcementsResponse = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/getAnnouncements.php",data);
                const assignmentsResponse = await axios.post("http://localhost/FSW-SE-Factory/e-learning-website/Server/getAssignments.php", data);
                setAnnouncementS(announcementsResponse.data.announcements || []);
                setAssignments(assignmentsResponse.data.assignments || []);
            }
            catch(error){
                console.error("Error fetching dashboard data:", error);
            }
        }

        fetchDashboardData();
    }, [course_id]);

    const handleAddAnnouncement = (newAnnouncement) => {
        setAnnouncementS([...announcements, newAnnouncement]);
      };
    
      const handleAddAssignment = (newAssignment) => {
        setAssignments([...assignments, newAssignment]);
      };


    return (
        <div className="dashboard-container">
            <div className="dashboard-section">
                <div className="posting-container">
                    <div className="posting-header"> 
                        <h2>Post Content</h2>
                        <div className="add-icons">
                            <div className="add-item" onClick={() => setSelectedForm("announcement")}>
                                ➕ Add Announcement
                            </div>
                            <div className="add-item" onClick={() => setSelectedForm("assignment")}>
                                ➕ Add Assignement
                            </div>
                        </div>
                    </div>

                </div>

                {/* Announcements */}
                <h3>Announcements</h3>
                <div className="announcements-list">
                <h3>Announcements</h3>
                {announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                        <div key={announcement.id || `announcement-${index}`} className="card">
                        <h4>{announcement.title}</h4>
                        <p>{announcement.content}</p>
                        <span>Posted on: {new Date(announcement.created_at).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No announcements posted yet.</p>
                )}
                </div>

                {/* Assignments */}
                <div className="assignments-list">
                    <h3>Assignments</h3>
                    {assignments.length > 0 ? (
                        assignments.map((assignment, index) => (
                            <div key={assignment.id || `assignment-${index}`} className="card">
                            <h4>{assignment.title}</h4>
                            <p>{assignment.description}</p>
                            <span>Due Date: {new Date(assignment.due_date).toLocaleDateString()}</span><br></br>
                            <span>Posted on: {new Date(assignment.created_at).toLocaleString()}</span>
                            </div>
                        ))
                    ) : (
                        <p>No assignments posted yet.</p>
                    )}
                </div>

                {/*Dialogs*/}
                {selectedForm === "announcement" && (
                    <AddAnnouncementDialog
                        onClose={() => setSelectedForm(null)}
                        onSave={handleAddAnnouncement}
                        courseId={course_id}
                    />
                )}

                {selectedForm === "assignment" && (
                    <AddAssignmentsDialog
                        onClose={() => setSelectedForm(null)}
                        onSave={handleAddAssignment}
                        courseId={course_id}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;

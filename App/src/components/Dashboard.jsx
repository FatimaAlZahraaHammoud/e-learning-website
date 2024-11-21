import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({course_id}) => {
    const [announcements, setAnnouncementS] = useState([]);
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try{
                const data = new FormData();
                data.append("course_id", course_id);
                const announcementsResponse = await axios.get("http://localhost/FSW-SE-Factory/e-learning-website/Server/getAnnouncements.php",data);
                const assignmentsResponse = await axios.get("http://localhost/FSW-SE-Factory/e-learning-website/Server/getAssignments.php", data);
                setAnnouncementS(announcementsResponse.data);
                setAssignments(assignmentsResponse.data);
            }
            catch(error){
                console.error("Error fetching dashboard data:", error);
            }
        }

        fetchDashboardData();
    }, []);


    return (
        <div className="dashboard-container">
            <div className="dashboard-section">

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

                </div>

                <h3>Announcements</h3>
            </div>
        </div>
    );
};

export default Dashboard;

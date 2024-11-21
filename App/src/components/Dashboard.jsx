import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css"
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
                console.log(announcementsResponse.data);
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
            
        </div>
    );
};

export default Dashboard;

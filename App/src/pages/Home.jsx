import React, {useState, useEffect} from "react";
import HeroSection from "../components/common/HeroSection";
import Courses from "../components/instructor/Courses";
import { jwtDecode } from "jwt-decode";
import AllStudents from "../components/admin/AllStudents";
import Instructors from "../components/admin/Instructors";
import AllCourses from "../components/admin/AllCourses";
import Sidebar from "../components/common/Sidebar";

export const AdminComponent = () => {
    const [activeSection, setActiveSection] = useState("students");
    return(
      <div className="course-page">
        <Sidebar setActiveSection={setActiveSection}/>
        <div className="content">
          {activeSection === "students" && <AllStudents />}
          {activeSection === "instructors" && <Instructors />}
          {activeSection === "courses" && <AllCourses />}
        </div>
      </div>
    )
};

const Home = () => {
  
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <div>
      {role !== "admin" && <HeroSection />}
      {role !== "admin" && <Courses />}
      {role === "admin" && <AdminComponent />}
    </div>
  );
};

export default Home;

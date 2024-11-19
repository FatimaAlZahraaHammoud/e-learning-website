import React, {useState, useEffect} from "react";
import HeroSection from "../components/HeroSection";
import Courses from "../components/Courses";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Courses />
    </div>
  );
};

export default Home;

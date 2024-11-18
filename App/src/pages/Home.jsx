import React, {useState, useEffect} from "react";
import HeroSection from "../components/HeroSection";
import { useNavigate} from "react-router-dom";
import axios from "axios";

const Home = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;

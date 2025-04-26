import React from "react";
import Footer from "../Component/Footer";
import HeroSection from "../Component/HeroSection";
import AboutSection from "../Component/About";
import FindUs from "../Component/FindUs";
import Testimonial from "../Component/Testimonial";

const Main = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <div className="bg-[#1c1c1c]">
        <Testimonial/>
        <FindUs className="mx-6" />
      </div>
      <Footer />
    </div>
  );
};

export default Main;

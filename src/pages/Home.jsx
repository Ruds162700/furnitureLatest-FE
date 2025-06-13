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
        <Testimonial/>
      <div className="bg-[#faf8f5]">
        <FindUs className="mx-6" />
      </div>
      <Footer />
    </div>
  );
};

export default Main;

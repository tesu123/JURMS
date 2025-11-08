import React from "react";
import LandingPage from "../pages/LandingPage.jsx";
import Footer from "../components/Footer.jsx";

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Landing Page Content */}
      <div className="flex-1">
        <LandingPage />
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default LandingLayout;

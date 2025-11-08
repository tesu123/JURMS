import React from "react";
import mnLogo from "../assets/mn.png";

const Logo = ({ className }) => {
  return (
    <div className={`${className}`}>
      <img className="w-full" src={mnLogo} alt="zuno logo" />
    </div>
  );
};

export default Logo;

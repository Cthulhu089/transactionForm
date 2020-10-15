import React from "react";
import "./CustomContainer.css";

const CustomContainer = ({ icon, title, children, className }) => {
  return (
    <div className={className}>
      <div className="title-container">
        <div className="title">
          {icon} {title}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomContainer;

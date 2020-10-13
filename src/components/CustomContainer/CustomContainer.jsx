import React from "react";
import arrows from "../../assets/icons/arrows.png";
import "./CustomContainer.css";
import CachedIcon from "@material-ui/icons/Cached";

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

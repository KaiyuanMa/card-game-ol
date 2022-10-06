import React from "react";
import AnimatedRoutes from "./AnimatedRoutes";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

function MiddleContent() {
  return (
    <div className="middle-content">
      <div className="page-wrapper">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

export default MiddleContent;

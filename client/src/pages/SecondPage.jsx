import sample_video from "../assets/icon/Sample_video.png";
import React from "react";

export default function SecondPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
         {/* ✅ SVG Shape Divider */}
      <div className="relative">
        <div className="custom-shape-divider-bottom-1749393952">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
         <div className="transform -translate-x-1/2 translate-y-1/2 w-[90%] h-[400px] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl z-10 flex items-center justify-center">
            <img
            src={sample_video}
            alt="Sample Video"
            className="w-[100%] w-auto object-contain"
            />
        </div>
    </div>
  );
}
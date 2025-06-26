import React from "react";

const WormholeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {/* Create a radial mesh pattern */}
        <defs>
          <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path 
              d="M 0 20 Q 10 10 20 20 T 40 20" 
              stroke="#9379F4" 
              fill="none" 
              strokeWidth="0.5"
            />
            <path 
              d="M 20 0 Q 10 10 20 20 T 20 40" 
              stroke="#CF8DFA" 
              fill="none" 
              strokeWidth="0.5"
            />
            <circle cx="20" cy="20" r="1" fill="#F472B6" />
          </pattern>
        </defs>
        
        {/* Apply the pattern with radial gradient scaling */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#mesh)" 
          transform="scale(1.5) rotate(15) translate(-20,-20)"
        />
      </svg>
    </div>
  );
};

export default WormholeBackground;
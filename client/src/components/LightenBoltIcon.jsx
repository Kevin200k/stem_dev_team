import React from 'react';

const LightningBoltIcon = () => {
  return (
    <div className="absolute top-[22%] left-[6%] md:left-[12%] z-30">
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,15 35,60 65,60 50,85 65,40 35,40"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1.2"
        />
        <polygon
          points="50,15 35,60 65,60 50,85 65,40 35,40"
          fill="none"
          stroke="#D5D2E3"
          strokeWidth="2.5"
          transform="translate(2,2)"
        />
      </svg>
    </div>
  );
};

export default LightningBoltIcon;
import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  // useEffect(() => {
  //   const starCount = 50;
  //   const stars = [];
  //   for (let i = 0; i < starCount; i++) {
  //     const star = document.createElement("div");
  //     star.className = "star";
  //     star.style.left = `${Math.random() * 100}%`;
  //     star.style.animationDuration = `${2 + Math.random() * 3}s`;
  //     document.querySelector(".stars")?.appendChild(star);
  //     stars.push(star);
  //   }
  //   return () => stars.forEach(star => star.remove());
  // }, []);

  return (
    <section className="min-h-[90vh] pb-[130px] flex px-6 md:px-16 py-0 bg-gradient-to-b from-[#1d1f5a] via-[#51399b] to-[#504194] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1d1f5a] via-[#51399b] to-[#504194] z-0" />

      {/* Falling Stars */}
      <div className="stars absolute top-0 left-0 w-full h-full pointer-events-none z-10"></div>

      {/* Hero Content */}
      <div className="flex flex-col w-full items-center justify-center text-center z-20 animate-fadeInUp">
        <h1 className="font-poppins text-white text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-medium text-balance leading-[1.05]">
          <span className="block m-0 p-0">
            <span className="text-[#cf8dfa] pr-3 font-semibold text-[72px]">{">"}</span>
            Learn Smarter.
          </span>
          <span className="block m-0 p-0">Learn Your Way Today.</span>
        </h1>
        <p className="font-poppins text-white text-lg md:text-xl max-w-3xl mx-auto mt-6 lg:text-[17px]">
          An elegant, AI-powered learning platform tailored to your unique style — personalized for every subject, every learner.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button className="flex items-center gap-1 px-7 py-2 rounded-4xl bg-gradient-to-tr from-[#9d5aff] to-[#d48cfa] text-white text-[17px] font-medium shadow-lg hover:scale-105 transition">
            Get Started
            <ArrowUpRight size={20} className="text-white mt-[1px]" />
          </button>
        </div>
      </div>

      {/* Placeholder for screen mockup */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[90%] h-[400px] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl z-10"></div>

      {/* SVG Shape Divider */}
      <div className="custom-shape-divider-bottom-1749393952">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        .star {
          position: absolute;
          top: -10px;
          width: 2px;
          height: 10px;
          background: white;
          opacity: 0.8;
          animation: fall linear infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .custom-shape-divider-bottom-1749393952 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          z-index: 15;
        }

        .custom-shape-divider-bottom-1749393952 svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 43px;
        }

        .custom-shape-divider-bottom-1749393952 .shape-fill {
          fill: #ffffff;
        }
      `}</style>
    </section>
  );
}

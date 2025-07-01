import React from "react";
import { ArrowUpRight } from "lucide-react";
import Star from "./Star";
import doodle_Screen from "../assets/icon/doodle_Screen.png";
import sample_video from "../assets/icon/Sample_video.png";

export default function Hero() {
  return (
    <section className="min-h-[100vh] pb-[130px] flex px-6 md:px-16 py-0 relative overflow-hidden">

      {/* ✦ Stars */}
      <Star size={110} color="#9379f4" className="absolute left-[15%] top-1/4 -translate-y-1/2 z-10 opacity-80" />
      <Star size={120} color="#cf8dfa" className="absolute right-[17%] top-[60%] z-10 opacity-70" />

      {/* ✧ Faint tiny stars */}
      <Star size={6} color="#ffffff12" className="absolute top-[25%] left-[45%]" />
      <Star size={5} color="#ffffff10" className="absolute top-[38%] right-[43%]" />
      <Star size={4} color="#ffffff0d" className="absolute bottom-[38%] left-[47%]" />
      <Star size={6} color="#ffffff14" className="absolute bottom-[33%] right-[49%]" />
      <Star size={4} color="#ffffff04" className="absolute top-[22%] left-[42%]" />
      <Star size={3} color="#ffffff03" className="absolute top-[35%] right-[40%]" />
      <Star size={5} color="#ffffff05" className="absolute bottom-[36%] left-[44%]" />
      <Star size={4} color="#ffffff04" className="absolute bottom-[30%] right-[46%]" />
      <Star size={3} color="#ffffff03" className="absolute top-[32%] left-[48%]" />
      <Star size={4} color="#ffffff04" className="absolute top-[40%] right-[46%]" />

      {/* ✧ Glowing stars */}
      <Star size={45} color="#eddcff" className="absolute top-[18%] left-[30%]" />
      <Star size={45} color="#e7d1ff" className="absolute top-[18%] right-[30%]" />
      <Star size={40} color="#f1e0ff" className="absolute top-[30%] left-[20%]" />
      <Star size={45} color="#e1c7ff" className="absolute top-[30%] right-[20%]" />
      <Star size={52} color="#f6eaff" className="absolute top-[45%] left-[12%]" />
      <Star size={46} color="#ecd8ff" className="absolute top-[45%] right-[12%]" />
      <Star size={45} color="#f0dbff" className="absolute bottom-[35%] left-[15%]" />
      <Star size={45} color="#e9d0ff" className="absolute bottom-[35%] right-[15%]" />
      <Star size={40} color="#ebd6ff" className="absolute bottom-[18%] left-[30%]" />
      <Star size={40} color="#ecd7ff" className="absolute bottom-[18%] right-[30%]" />

      {/* Main Text */}
      <div className="relative flex flex-col w-full items-center justify-center text-center z-20 animate-fadeInUp">
        <h1 className="ibm-font sm:text-6xl md:text-7xl lg:text-[80px] font-medium text-balance leading-[1.05] flex flex-col">
          <span className="ibm-font"> Discover. Learn. Evolve.</span>
          <div>
            <span className="ibm-font">It's time to{" "}</span>
            <span className="ibm-font bg-gradient-to-r from-[#9379f4] to-[#f472b6] text-transparent bg-clip-text">
              Level Up
              <img className="inline h-20 ml-2" src={doodle_Screen} alt="Doodle" />
            </span>
          </div>
        </h1>

        <p className="text-lg md:text-xl max-w-3xl mx-auto mt-6 lg:text-[17px]">
          Explore gamified lessons, AI-personalized challenges, and immersive learning paths designed to help every learner grow faster — and smarter.
        </p>

        <div className="relative inline-flex items-center justify-center mt-8 gap-4 group">
          <div className="absolute inset-0 opacity-60 transition-all duration-[1000ms] bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
          <a
            role="button"
            className="group relative inline-flex items-center justify-center text-base rounded-4xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
            href="#"
            title="Start Learning"
          >
            Start Your Adventure
            <svg
              aria-hidden="true"
              viewBox="0 0 10 10"
              height="10"
              width="10"
              fill="none"
              className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
            >
              <path d="M0 5h7" className="transition-opacity opacity-0 group-hover:opacity-100" />
              <path d="M1 1l4 4-4 4" className="transition-transform group-hover:translate-x-[3px]" />
            </svg>
          </a>
        </div>
      </div>

      {/* ✅ Translucent Screen with Sample Video Image Inside */}
      {/* <div className="transform -translate-x-1/2 translate-y-1/2 w-[90%] h-[400px] bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl z-10 flex items-center justify-center">
        <img
          src={sample_video}
          alt="Sample Video"
          className="w-[100%] w-auto object-contain"
        />
      </div> */}

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

      <style jsx>{`
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

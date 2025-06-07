// src/components/Hero.jsx
import React from "react";
// import { Player } from "@lottiefiles/react-lottie-player";
// import animationData from "../assets/learning-ai.json"; // Replace with your Lottie JSON

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-32 bg-white relative overflow-hidden">
      {/* Sparkle background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F5F3FF] to-transparent pointer-events-none z-0" />

      {/* Text */}
      <div className="w-full md:w-1/2 z-10 text-center md:text-left space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#E6E6FA] to-[#DA70D6] bg-clip-text text-transparent leading-tight">
          Learn Smarter. Learn Your Way.
        </h1>
        <p className="text-[#333] text-lg md:text-xl max-w-md mx-auto md:mx-0">
          A beautiful, AI-powered platform that adapts to how you learn best.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#DA70D6] to-[#C8A2C8] text-white font-semibold shadow-lg hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-2xl border border-[#DA70D6] text-[#DA70D6] font-semibold hover:bg-[#FAF5FF] transition">
            Take a Quick Tour
          </button>
        </div>
      </div>

      {/* Lottie animation */}
      {/* <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center z-10">
        <div className="w-[320px] h-[320px] bg-[#F5F3FF] rounded-full shadow-lg flex items-center justify-center">
          <Player autoplay loop src={animationData} style={{ height: '280px', width: '280px' }} />
        </div>
      </div> */}
    </section>
  );
}

import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // Use SLIM for better performance
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-[-1]"
      options={{
        fullScreen: { enable: false },
        background: { color: "#ffffff" },
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: ["#a78bfa", "#c084fc", "#94a3b8"] },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: { min: 2, max: 4 } },
          move: {
            enable: true,
            speed: 0.5,
            direction: "top",
            outModes: { default: "out" },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

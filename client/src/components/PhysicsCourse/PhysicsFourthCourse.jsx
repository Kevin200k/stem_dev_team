import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Work, Energy, and Power" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Engage learners with real-world examples of work, energy, and power.",
    "scene_description": "A weightlifter lifting weights, a roller coaster going up a hill, a car accelerating. Animated text: 'How much effort? How much capability? How fast?'",
    "script": "From lifting heavy objects to generating electricity, the concepts of work, energy, and power are fundamental to understanding how the world around us operates. Let's unlock these powerful ideas in physics! 🏋️‍♀️🎢⚡"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define work done by a constant force and calculate work using the dot product.",
    "content": "**Work (W)** in physics is done when a force causes a displacement of an object in the direction of the force. It's calculated as **W = Fd cosθ**, where F is force, d is displacement, and θ is the angle between the force and displacement. If you push a wall and it doesn't move, no work is done! 💪"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Understand the concept of kinetic energy and potential energy (gravitational and elastic).",
    "scene_description": "Animations: a moving car (kinetic energy); a ball held high (gravitational potential energy); a stretched spring (elastic potential energy).",
    "script": "**Energy** is the ability to do work. **Kinetic energy** is the energy of motion (KE = ½mv²). **Potential energy** is stored energy: **Gravitational potential energy** (PEg = mgh) is due to an object's height, and **Elastic potential energy** (PEe = ½kx²) is stored in stretched or compressed springs. 🏎️🌳🏹"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Apply the Work-Energy Theorem to analyze motion in mechanical systems.",
    "content": "The **Work-Energy Theorem** states that the net work done on an object is equal to its change in kinetic energy ($W_{net} = ΔKE$). This powerful theorem connects force, displacement, and changes in motion, providing an alternative way to solve many kinematics problems. 🔄"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Use conservation of mechanical energy to solve problems involving no non-conservative forces.",
    "content": "In systems where only conservative forces (like gravity or spring force) do work, **mechanical energy (KE + PE) is conserved**. This means the total mechanical energy before equals the total mechanical energy after. This principle simplifies many problems, especially those involving falling or swinging objects! 🎢"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to calculate work, kinetic energy, or potential energy.",
    "title": "Work & Energy Calculator",
    "description": "Calculate work done, kinetic energy, or gravitational potential energy by inputting the required values. Explore how changes affect the results!",
    "working_code": `<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Work & Energy Calculator</h3><hr style='width:80%; margin:20px 0; border:0; border-top:1px dashed #ccc;'><h4 style='font-weight:bold; margin-bottom:10px;'>Calculate Work (W=Fd cosθ)</h4><label>Force (N): <input type='number' id='workF' style='padding:8px; margin-bottom:5px; width:100px;'></label><br/><label>Distance (m): <input type='number' id='workD' style='padding:8px; margin-bottom:5px; width:100px;'></label><br/><label>Angle (degrees): <input type='number' id='workTheta' value='0' style='padding:8px; margin-bottom:15px; width:100px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='calculateWork()'>Calculate Work</button><p id='workResult' style='margin-top:10px; font-weight:bold;'></p><hr style='width:80%; margin:20px 0; border:0; border-top:1px dashed #ccc;'><h4 style='font-weight:bold; margin-bottom:10px;'>Calculate Kinetic Energy (KE=½mv²)</h4><label>Mass (kg): <input type='number' id='keM' style='padding:8px; margin-bottom:5px; width:100px;'></label><br/><label>Velocity (m/s): <input type='number' id='keV' style='padding:8px; margin-bottom:15px; width:100px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='calculateKE()'>Calculate KE</button><p id='keResult' style='margin-top:10px; font-weight:bold;'></p><hr style='width:80%; margin:20px 0; border:0; border-top:1px dashed #ccc;'><h4 style='font-weight:bold; margin-bottom:10px;'>Calculate Gravitational Potential Energy (PEg=mgh)</h4><label>Mass (kg): <input type='number' id='pegM' style='padding:8px; margin-bottom:5px; width:100px;'></label><br/><label>Height (m): <input type='number' id='pegH' style='padding:8px; margin-bottom:5px; width:100px;'></label><br/><label>Gravity (g=9.81 m/s²): <input type='number' id='pegG' value='9.81' style='padding:8px; margin-bottom:15px; width:100px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='calculatePEg()'>Calculate PEg</button><p id='pegResult' style='margin-top:10px; font-weight:bold;'></p><script>function calculateWork(){ const f = parseFloat(document.getElementById('workF').value); const d = parseFloat(document.getElementById('workD').value); const theta = parseFloat(document.getElementById('workTheta').value); if(isNaN(f) || isNaN(d) || isNaN(theta)) { document.getElementById('workResult').innerText = 'Enter valid numbers.'; return; } const work = f * d * Math.cos(theta * Math.PI / 180); document.getElementById('workResult').innerText = 'Work: ' + work.toFixed(2) + ' Joules'; } function calculateKE(){ const m = parseFloat(document.getElementById('keM').value); const v = parseFloat(document.getElementById('keV').value); if(isNaN(m) || isNaN(v)) { document.getElementById('keResult').innerText = 'Enter valid numbers.'; return; } const ke = 0.5 * m * v * v; document.getElementById('keResult').innerText = 'Kinetic Energy: ' + ke.toFixed(2) + ' Joules'; } function calculatePEg(){ const m = parseFloat(document.getElementById('pegM').value); const h = parseFloat(document.getElementById('pegH').value); const g = parseFloat(document.getElementById('pegG').value); if(isNaN(m) || isNaN(h) || isNaN(g)) { document.getElementById('pegResult').innerText = 'Enter valid numbers.'; return; } const peg = m * g * h; document.getElementById('pegResult').innerText = 'Gravitational Potential Energy: ' + peg.toFixed(2) + ' Joules'; }</script><p style='margin-top:15px;'>Use these calculators to practice applying work and energy formulas.</p></body></html>`,
    "explain": "Practice calculating work, kinetic energy, and potential energy. These are the building blocks for understanding energy transformations!"
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Identify and quantify the effect of friction and air resistance as non-conservative forces.",
    "scene_description": "Animations showing a block sliding to a stop due to friction (energy loss as heat); a skydiver reaching terminal velocity due to air resistance.",
    "script": "Not all forces conserve energy! **Friction** and **air resistance** are **non-conservative forces**; they dissipate mechanical energy, usually as heat or sound. This means mechanical energy is NOT conserved when these forces are present, and we must account for the energy 'lost' to them. 🔥💨"
  },
  {
    "type": "text",
    "step_number": 8,
    "lesson_purpose": "Calculate mechanical power and understand its relationship to work and time.",
    "content": "**Power (P)** is the rate at which work is done or energy is transferred. It's calculated as **P = W/t** (work divided by time) or **P = Fv** (force times velocity). Power tells us how quickly energy is being used or converted. The unit of power is the Watt (W). ⏱️⚡"
  },
  {
    "type": "summary",
    "step_number": 9,
    "lesson_purpose": "Recap the core concepts of work, energy, and power.",
    "content": "**Work, energy, and power are interconnected concepts** that describe how forces cause motion and how energy is transformed and transferred. From the Work-Energy Theorem to the Conservation of Mechanical Energy, these principles are essential for analyzing physical systems. You're now powered up with physics knowledge! 🔋"
  },
  {
    "type": "quiz",
    "step_number": 10,
    "lesson_purpose": "Check understanding of work, energy, and power concepts and calculations.",
    "questions": [
      {
        "question": "Which of the following situations involves positive work being done on an object?",
        "options": [
          "A person holding a heavy box stationary.",
          "A car braking to a stop.",
          "A force pushing a box in the direction of its motion.",
          "A satellite orbiting Earth at a constant speed."
        ],
        "correct_answer": 2,
        "explanation": "Positive work is done when a force causes displacement in the same direction as the force. Holding a box stationary (no displacement), braking (force opposite to motion), and orbiting (force perpendicular to displacement) do not involve positive work."
      },
      {
        "question": "What type of energy is stored in a stretched rubber band?",
        "options": [
          "Kinetic energy",
          "Gravitational potential energy",
          "Elastic potential energy",
          "Chemical energy"
        ],
        "correct_answer": 2,
        "explanation": "Elastic potential energy is stored in objects that can be stretched or compressed, like rubber bands or springs."
      },
      {
        "question": "If a machine does 1000 Joules of work in 10 seconds, what is its power output?",
        "options": [
          "10 Joules",
          "100 Watts",
          "1000 Watts",
          "100 Joules"
        ],
        "correct_answer": 1,
        "explanation": "Power is calculated as Work / Time. So, 1000 Joules / 10 seconds = 100 Watts."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 11,
    "lesson_purpose": "Encourage applying energy concepts to real-world systems.",
    "content": "You've now harnessed the concepts of work, energy, and power! These principles are fundamental to understanding everything from simple machines to complex power generation systems. Keep observing the world through the lens of energy, and you'll see its transformations everywhere! 💡"
  }
];

// Main component for the Physics Work, Energy, and Power Course
const PhysicsWorkEnergyPowerCourse = () => {
  // State to keep track of the current step being displayed
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Get the content for the current step
  const currentStep = LESSON_CONTENT[currentStepIndex];

  // Hook to enable programmatic navigation
  const navigate = useNavigate();

  // Handler for moving to the next lesson step
  const handleNext = () => {
    if (currentStepIndex < LESSON_CONTENT.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Handler for moving to the previous lesson step
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Handler to go back to the previous page (e.g., the Courses list)
  const handleGoBack = () => {
    navigate(-1); // Navigates one step back in the browser's history
  };

  // Function to render content based on the step's 'type'
  const renderLessonContent = (step) => {
    switch (step.type) {
      case 'video':
        return (
          <div className="space-y-4 px-4 py-2">
            <p className="text-gray-700 italic text-lg">"{step.script}"</p>
            <p className="text-gray-600 text-base">
              <span className="font-semibold">Scene:</span> {step.scene_description}
            </p>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center text-gray-500 rounded-lg shadow-inner text-center p-4">
              <p className="text-xl font-medium">[Video Placeholder: {step.script.substring(0, 40)}...]</p>
            </div>
          </div>
        );
      case 'text':
        return (
          <p className="text-gray-800 leading-relaxed text-lg px-4 py-2">
            {step.content}
          </p>
        );
      case 'audio':
        return (
          <div className="space-y-4 px-4 py-2">
            <p className="text-gray-800 leading-relaxed text-lg">
              {step.content}
            </p>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-32 flex items-center justify-center text-gray-500 rounded-lg shadow-inner text-center p-4">
              <p className="text-xl font-medium">[Audio Placeholder]</p>
            </div>
          </div>
        );
      case 'interaction':
        return (
          <div className="space-y-4 px-4 py-2">
            <h3 className="text-2xl font-bold text-green-700">{step.title}</h3> {/* Consistent color for Physics theme */}
            <p className="text-gray-700 text-lg">{step.description}</p>
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                {/* iframe for embedding interactive code */}
                <iframe
                    srcDoc={step.working_code}
                    title={step.title}
                    className="w-full h-80 bg-white"
                    sandbox="allow-scripts allow-same-origin"
                ></iframe>
            </div>
            <p className="text-gray-600 italic text-base">{step.explain}</p>
          </div>
        );
      case 'summary':
        return (
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-green-50 p-6 rounded-md border border-green-200 shadow-sm text-center"> {/* Consistent color for Physics theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-green-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Consistent color for Physics theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-green-600 transition-colors duration-200"> {/* Consistent color for Physics theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-green-600 transition duration-150 ease-in-out" // Consistent color for Physics theme
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <p className="text-red-500 text-lg px-4 py-2">Unknown content type: {step.type}</p>;
    }
  };

  return (
    // Main container for the lesson page, with background styling
    <div className="min-w-4xl p-6 md:p-8 bg-gray-50 rounded-xl shadow-2xl font-sans relative overflow-hidden">
      {/* Subtle background gradients for visual flair, adapted for Physics theme */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-200 rounded-full opacity-30 blur-3xl translate-x-1/2 -translate-y-1/2"></div>

      {/* Back to Courses Button */}
      <button
        onClick={handleGoBack}
        className="absolute top-6 left-6 flex items-center px-4 py-2 rounded-lg font-semibold text-base transition-all duration-300 ease-in-out
                   bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Courses
      </button>

      {/* Lesson Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10 relative z-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-teal-600"> {/* Physics theme gradient */}
          Work, Energy, and Power
        </span>
      </h1>

      {/* Main Lesson Content Area */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 mb-8 shadow-lg relative z-10">
        {/* Step Progress and Purpose */}
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-xl font-semibold text-green-800 mb-1"> {/* Physics theme color */}
            Step {currentStepIndex + 1} / {LESSON_CONTENT.length}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-green-700">Purpose:</span> {currentStep.lesson_purpose} {/* Physics theme color */}
          </p>
        </div>

        {/* Dynamic Content Display Area */}
        <div className="min-h-[350px] bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner flex items-center justify-center text-center transition-all duration-300 ease-in-out">
          {renderLessonContent(currentStep)}
        </div>

        {/* Navigation Buttons (Previous/Next) */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="flex items-center px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out
                        bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === LESSON_CONTENT.length - 1}
            className="flex items-center px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out
                        bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-lg hover:shadow-xl
                        hover:from-green-700 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Next Step
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="text-center text-gray-500 text-sm mt-8 relative z-10">
        Navigate through the lesson steps using the 'Previous' and 'Next Step' buttons.
      </div>
    </div>
  );
};

export default PhysicsWorkEnergyPowerCourse;

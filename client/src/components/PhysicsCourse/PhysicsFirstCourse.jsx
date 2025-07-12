import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Kinematics: Describing Motion" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Engage learners with the concept of motion and how to describe it.",
    "scene_description": "A car accelerating from a stoplight, a ball rolling down a ramp, or a rocket launching. Animated text: 'How do we describe movement?'",
    "script": "Everything around us is in motion! From a car speeding up to a ball falling, how do scientists precisely describe this movement? Welcome to Kinematics, the language of motion! 🚀"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define fundamental concepts: position, displacement, velocity, speed, and acceleration.",
    "content": "**Kinematics** is the study of motion without considering its causes. We'll explore: **Position** (where an object is), **Displacement** (change in position), **Speed** (how fast it's moving), **Velocity** (speed with direction), and **Acceleration** (rate of velocity change). 📏⏱️➡️"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Differentiate between scalar and vector quantities with real-life examples.",
    "scene_description": "Animations showing a person walking 5 meters (distance, scalar) vs. walking 5 meters North (displacement, vector); a speedometer showing speed (scalar) vs. a car moving at 60 mph East (velocity, vector).",
    "script": "Some quantities just tell us 'how much' (like speed or distance) – these are **scalars**. Others tell us 'how much' AND 'in what direction' (like velocity or displacement) – these are **vectors**. Understanding the difference is key to describing motion accurately! 🧭"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Interpret and construct motion graphs: displacement-time, velocity-time, and acceleration-time graphs.",
    "content": "Graphs are powerful tools in kinematics! A **displacement-time graph** shows position over time. A **velocity-time graph** shows velocity over time. An **acceleration-time graph** shows acceleration over time. Each tells a unique story about motion! 📈"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Analyze motion using gradient and area under curves in velocity-time graphs.",
    "content": "On a **velocity-time graph**: the **gradient (slope)** tells us the **acceleration**, and the **area under the curve** tells us the **displacement**. This means a simple graph can reveal a lot about an object's motion! Listen for examples. 🔊"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to solve one-dimensional motion problems using kinematic equations.",
    "title": "Kinematics Equation Solver",
    "description": "Input known values (initial velocity, final velocity, acceleration, time, displacement) and solve for the unknown using the kinematic equations. Try different scenarios!",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Kinematics Calculator</h3><label>Initial Velocity (m/s): <input type='number' id='vi' style='padding:8px; margin-bottom:5px; width:120px;'></label><br/><label>Acceleration (m/s²): <input type='number' id='a' style='padding:8px; margin-bottom:5px; width:120px;'></label><br/><label>Time (s): <input type='number' id='t' style='padding:8px; margin-bottom:15px; width:120px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='solveKinematics()'>Calculate Final Velocity</button><p id='result' style='margin-top:20px; font-weight:bold;'></p><script>function solveKinematics(){ const vi = parseFloat(document.getElementById('vi').value); const a = parseFloat(document.getElementById('a').value); const t = parseFloat(document.getElementById('t').value); if(isNaN(vi) || isNaN(a) || isNaN(t)) { document.getElementById('result').innerText = 'Please enter valid numbers.'; return; } const vf = vi + a * t; document.getElementById('result').innerText = 'Final Velocity: ' + vf.toFixed(2) + ' m/s'; }</script><p style='margin-top:15px;'>This is a placeholder for a kinematics equation solver.</p></body></html>",
    "explain": "Apply the kinematic equations to solve problems. This is where the math of motion comes alive!"
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Understand free fall motion and the effects of gravity.",
    "scene_description": "Animation showing a feather and a bowling ball falling simultaneously in a vacuum chamber, then the same objects falling in air, highlighting the effect of air resistance.",
    "script": "What happens when objects just fall? That's **free fall**! In a vacuum, all objects fall at the same rate due to gravity, regardless of mass. But in air, resistance plays a role. Let's see the surprising truth about falling objects! 🍎"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the core concepts of kinematics.",
    "content": "**Kinematics is the foundation of understanding motion!** 🏃‍♀️💨 We've learned to describe movement using position, displacement, velocity, speed, and acceleration, and how to analyze it with graphs and equations. You're now a motion expert! 🧠"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of kinematics terms, graphs, and equations.",
    "questions": [
      {
        "question": "Which of the following is a vector quantity?",
        "options": [
          "Speed",
          "Distance",
          "Time",
          "Velocity"
        ],
        "correct_answer": 3,
        "explanation": "Velocity includes both magnitude (speed) and direction, making it a vector quantity."
      },
      {
        "question": "On a velocity-time graph, what does the gradient (slope) represent?",
        "options": [
          "Displacement",
          "Position",
          "Acceleration",
          "Speed"
        ],
        "correct_answer": 2,
        "explanation": "The gradient of a velocity-time graph indicates the rate of change of velocity, which is acceleration."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage further exploration and connect kinematics to real-world applications.",
    "content": "You've successfully navigated the world of kinematics! These principles are essential in fields like engineering, sports science, and even space exploration. Keep observing motion, and you'll see physics everywhere! 🌌"
  }
];

// Main component for the Physics Kinematics Course
const PhysicsKinematicsCourse = () => {
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
            <h3 className="text-2xl font-bold text-green-700">{step.title}</h3> {/* Adjusted color for Physics theme */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-green-50 p-6 rounded-md border border-green-200 shadow-sm text-center"> {/* Adjusted color for Physics theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-green-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Adjusted color for Physics theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-green-600 transition-colors duration-200"> {/* Adjusted color for Physics theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-green-600 transition duration-150 ease-in-out" // Adjusted color for Physics theme
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
          Kinematics: Describing Motion
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

export default PhysicsKinematicsCourse;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Momentum and Collisions" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Engage learners with dramatic visuals of collisions and explosions.",
    "scene_description": "Slow-motion footage of billiard balls colliding, a car crash test, or a controlled explosion. Animated text: 'What happens when things hit each other?'",
    "script": "Ever wondered what really happens when objects crash, or how a rocket launches with such force? It's all about Momentum and Collisions! Let's explore the powerful physics behind these impacts. 💥"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define linear momentum and impulse and understand the impulse-momentum theorem.",
    "content": "**Linear momentum (p)** is a measure of an object's mass in motion, calculated as mass × velocity (p = mv). **Impulse (J)** is the change in momentum, often caused by a force acting over time (J = FΔt). The **impulse-momentum theorem** states that impulse equals the change in momentum. 🚀"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Apply the law of conservation of momentum to isolated systems.",
    "scene_description": "Animation of two ice skaters pushing off each other, or two carts colliding on a frictionless track, showing their velocities before and after.",
    "script": "In an isolated system (where no external forces act), the total momentum before a collision or explosion is equal to the total momentum after. This is the powerful **Law of Conservation of Momentum**! Watch how it plays out in these scenarios. ⛸️"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Differentiate between elastic, inelastic, and perfectly inelastic collisions.",
    "content": "Collisions aren't all the same! In an **elastic collision**, kinetic energy is conserved (like billiard balls). In an **inelastic collision**, kinetic energy is lost (like a car crash). In a **perfectly inelastic collision**, objects stick together after impact. 🎱🚗"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Explain real-world examples using each type of collision.",
    "content": "Think about real-world examples: A super bouncy ball hitting the ground is close to elastic. A football tackle is inelastic. And two train cars coupling together is perfectly inelastic. Listen for more examples and how energy changes! 🔊"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to calculate momentum and impulse.",
    "title": "Momentum & Impulse Calculator",
    "description": "Input mass and velocity to find momentum, or force and time to find impulse. Explore how changing values affects the outcome.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Momentum & Impulse</h3><label>Mass (kg): <input type='number' id='mass' style='padding:8px; margin-bottom:5px; width:120px;'></label><br/><label>Velocity (m/s): <input type='number' id='velocity' style='padding:8px; margin-bottom:15px; width:120px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='calculateMomentum()'>Calculate Momentum</button><p id='momentumResult' style='margin-top:20px; font-weight:bold;'></p><hr style='width:80%; margin:20px 0; border:0; border-top:1px solid #ccc;'><label>Force (N): <input type='number' id='force' style='padding:8px; margin-bottom:5px; width:120px;'></label><br/><label>Time (s): <input type='number' id='time' style='padding:8px; margin-bottom:15px; width:120px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='calculateImpulse()'>Calculate Impulse</button><p id='impulseResult' style='margin-top:20px; font-weight:bold;'></p><script>function calculateMomentum(){ const m = parseFloat(document.getElementById('mass').value); const v = parseFloat(document.getElementById('velocity').value); if(isNaN(m) || isNaN(v)) { document.getElementById('momentumResult').innerText = 'Enter valid numbers.'; return; } document.getElementById('momentumResult').innerText = 'Momentum: ' + (m*v).toFixed(2) + ' kg·m/s'; } function calculateImpulse(){ const f = parseFloat(document.getElementById('force').value); const t = parseFloat(document.getElementById('time').value); if(isNaN(f) || isNaN(t)) { document.getElementById('impulseResult').innerText = 'Enter valid numbers.'; return; } document.getElementById('impulseResult').innerText = 'Impulse: ' + (f*t).toFixed(2) + ' N·s'; }</script><p style='margin-top:15px;'>This is a placeholder for a momentum and impulse calculator.</p></body></html>",
    "explain": "Practice calculating momentum and impulse, key concepts for understanding collisions."
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Understand the principles of explosion mechanics and energy dissipation in collisions.",
    "scene_description": "Animation of a grenade exploding (single object breaking into multiple pieces, conserving momentum), and then a car crash showing deformation and heat generation (energy dissipation).",
    "script": "Explosions are like collisions in reverse – momentum is conserved as pieces fly apart. But in many collisions, energy is 'lost' as heat, sound, or deformation. This **energy dissipation** is why things get damaged in a crash! 🔥"
  },
  {
    "type": "text",
    "step_number": 8,
    "lesson_purpose": "Use vector addition and diagramming to solve momentum problems involving angles.",
    "content": "When collisions happen at angles, we need **vector addition**! Momentum is a vector, so we break down velocities into x and y components, apply conservation of momentum in each direction, and then recombine them. It's like solving a geometric puzzle! 📐"
  },
  {
    "type": "summary",
    "step_number": 9,
    "lesson_purpose": "Recap the core concepts of momentum and collisions.",
    "content": "**Momentum and collisions are fundamental to understanding interactions!** 💥 We've explored how momentum is conserved, the types of collisions, and how energy is transferred. These principles explain everything from sports to astrophysics! 🌌"
  },
  {
    "type": "quiz",
    "step_number": 10,
    "lesson_purpose": "Check understanding of momentum, impulse, and collision types.",
    "questions": [
      {
        "question": "In a perfectly inelastic collision, what happens to the objects after impact?",
        "options": [
          "They bounce off each other with no energy loss.",
          "They stick together and move as one unit.",
          "They explode into multiple pieces.",
          "They reverse direction with increased speed."
        ],
        "correct_answer": 1,
        "explanation": "In a perfectly inelastic collision, the colliding objects join together and move as a single combined mass."
      },
      {
        "question": "What does the impulse-momentum theorem state?",
        "options": [
          "Force equals mass times acceleration.",
          "For every action, there is an equal and opposite reaction.",
          "Impulse is equal to the change in momentum.",
          "Momentum is always conserved in all systems."
        ],
        "correct_answer": 2,
        "explanation": "The impulse-momentum theorem directly links impulse (force applied over time) to the resulting change in an object's momentum."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 11,
    "lesson_purpose": "Encourage further exploration and real-world application of momentum principles.",
    "content": "You've now mastered the dynamics of momentum and collisions! These concepts are vital for understanding safety systems, rocket propulsion, and even the movement of celestial bodies. Keep exploring the forces that shape our universe! ✨"
  }
];

// Main component for the Physics Momentum and Collisions Course
const PhysicsMomentumCollisionsCourse = () => {
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
          Momentum and Collisions
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

export default PhysicsMomentumCollisionsCourse;
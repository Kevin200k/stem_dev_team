import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Newton's Laws of Motion" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce Newton's Laws with a dramatic visual of cause and effect.",
    "scene_description": "A slow-motion video of a bowling ball hitting pins, or a rocket launching with visible thrust. Animated text: 'Why do things move the way they do?'",
    "script": "Why does a ball stop rolling? Why does a rocket launch into space? The answers lie in three fundamental rules that govern all motion: Newton's Laws! Let's uncover the secrets of force and motion. 💥"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "State and explain Newton’s First Law of Motion (Inertia).",
    "content": "**Newton's First Law (Law of Inertia)** states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. Think of a book on a table staying put, or a hockey puck sliding on ice! 🧊"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Differentiate between inertia, mass, and weight, and their relationship to force and acceleration.",
    "scene_description": "Animations comparing pushing a small cart vs. a heavy cart (mass/inertia); a person on Earth vs. on the Moon (weight).",
    "script": "**Inertia** is an object's resistance to change in motion. **Mass** is the measure of inertia. **Weight** is the force of gravity on an object. A heavier object has more mass, more inertia, and requires more force to accelerate! 🏋️‍♀️"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "State and explain Newton’s Second Law of Motion (F=ma).",
    "content": "**Newton's Second Law** is perhaps the most famous: **Force = mass × acceleration (F = ma)**. This means the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. More force, more acceleration; more mass, less acceleration! धक्का💨"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Identify and draw free-body diagrams for various physical situations.",
    "content": "To solve force problems, we use **free-body diagrams**. These diagrams show all the forces acting on an object as arrows, helping us visualize and apply Newton's Laws. Listen for tips on drawing them correctly! ✏️"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to solve problems involving F=ma.",
    "title": "Force & Acceleration Calculator",
    "description": "Input any two values (Force, Mass, Acceleration) to calculate the third using F=ma. Experiment with different scenarios!",
    "working_code": `<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>F = ma Calculator</h3><label>Force (N): <input type='number' id='force' style='padding:8px; margin-bottom:5px; width:120px;'></label><br/><label>Mass (kg): <input type='number' id='mass' style='padding:8px; margin-bottom:5px; width:120px;'></label><br/><label>Acceleration (m/s²): <input type='number' id='accel' style='padding:8px; margin-bottom:15px; width:120px;'></label><br/><button style='padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:5px;' onclick='calculateFMA()'>Calculate</button><p id='fmaResult' style='margin-top:20px; font-weight:bold;'></p><script>function calculateFMA(){ const f = parseFloat(document.getElementById('force').value); const m = parseFloat(document.getElementById('mass').value); const a = parseFloat(document.getElementById('accel').value); let resultText = ''; if (!isNaN(f) && !isNaN(m) && isNaN(a)) { resultText = 'Acceleration: ' + (f/m).toFixed(2) + ' m/s²'; } else if (!isNaN(f) && isNaN(m) && !isNaN(a)) { resultText = 'Mass: ' + (f/a).toFixed(2) + ' kg'; } else if (isNaN(f) && !isNaN(m) && !isNaN(a)) { resultText = 'Force: ' + (m*a).toFixed(2) + ' N'; } else { resultText = 'Enter exactly two values.'; } document.getElementById('fmaResult').innerText = resultText; }</script><p style='margin-top:15px;'>This is a placeholder for an F=ma calculator.</p></body></html>`,
    "explain": "Practice applying Newton's Second Law to calculate force, mass, or acceleration in various scenarios."
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "State and explain Newton’s Third Law of Motion (Action-Reaction).",
    "scene_description": "Animations of a rocket launching (thrust vs. exhaust), a person pushing off a wall, and a bird flying (wings push air down, air pushes wings up).",
    "script": "**Newton's Third Law** states: For every action, there is an equal and opposite reaction. When you push on a wall, the wall pushes back on you with the same force! This law explains everything from walking to rocket propulsion. 🚀↔️🧱"
  },
  {
    "type": "text",
    "step_number": 8,
    "lesson_purpose": "Understand frictional forces, tension, and normal forces and their effects on motion.",
    "content": "Beyond pushes and pulls, other forces affect motion: **Friction** opposes motion between surfaces. **Tension** is the pulling force transmitted axially by a string, cable, or chain. **Normal force** is the support force exerted by a surface perpendicular to it. These forces are everywhere in our daily lives! 🔗"
  },
  {
    "type": "summary",
    "step_number": 9,
    "lesson_purpose": "Recap Newton's Laws and their importance.",
    "content": "**Newton's Laws are the bedrock of classical mechanics!** 🧱 They explain why objects move (or don't move) the way they do, from simple pushes to complex rocket launches. Understanding them unlocks the physics of our everyday world and forms the basis for many engineering applications! 🌍"
  },
  {
    "type": "quiz",
    "step_number": 10,
    "lesson_purpose": "Check understanding of Newton's Laws and related concepts.",
    "questions": [
      {
        "question": "Which of Newton's Laws explains why a passenger continues to move forward when a car suddenly brakes?",
        "options": [
          "First Law (Inertia)",
          "Second Law (F=ma)",
          "Third Law (Action-Reaction)",
          "Law of Universal Gravitation"
        ],
        "correct_answer": 0,
        "explanation": "Newton's First Law, also known as the Law of Inertia, states that an object in motion tends to stay in motion unless an external force acts upon it. Your body's inertia causes it to continue moving forward."
      },
      {
        "question": "According to Newton's Second Law, if you apply the same force to two objects, one with a large mass and one with a small mass, which one will have greater acceleration?",
        "options": [
          "The object with the large mass.",
          "The object with the small mass.",
          "Both will have the same acceleration.",
          "Neither will accelerate."
        ],
        "correct_answer": 1,
        "explanation": "Newton's Second Law (F=ma) shows that acceleration is inversely proportional to mass. For a constant force, a smaller mass will result in a greater acceleration."
      },
      {
        "question": "When you jump, your feet push down on the Earth, and the Earth pushes back up on your feet. This is an example of which of Newton's Laws?",
        "options": [
          "First Law",
          "Second Law",
          "Third Law",
          "Law of Conservation of Energy"
        ],
        "correct_answer": 2,
        "explanation": "Newton's Third Law states that for every action, there is an equal and opposite reaction. Your push on the Earth is the action, and the Earth's push back is the reaction."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 11,
    "lesson_purpose": "Encourage applying Newton's Laws to real-world scenarios.",
    "content": "You've now grasped the powerful principles of Newton's Laws of Motion! From designing safer cars and rollercoasters to understanding sports and space travel, these laws are applied everywhere. Keep observing the forces and motions around you, and you'll see physics in action every day! ✨"
  }
];

// Main component for the Physics Newton's Laws of Motion Course
const PhysicsNewtonsLawsCourse = () => {
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
          Newton's Laws of Motion
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

export default PhysicsNewtonsLawsCourse;

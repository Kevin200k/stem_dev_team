import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Understanding Limits" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Capture attention with a relatable phenomenon illustrating approaching a point without necessarily reaching it.",
    "scene_description": "A person walking towards a finish line, stopping just before it, or a car approaching a traffic light and slowing down.",
    "script": "Imagine you're inching closer and closer to a finish line, but never quite touching it. Or a car slowing down, getting super close to a stoplight without actually hitting it. 🤔 What's happening in those final moments?"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define the concept of a limit in simple terms.",
    "content": "In calculus, a **limit** describes the value that a function 'approaches' as the input (x) gets closer and closer to some number. It's about what happens *near* a point, not necessarily *at* the point itself. 🎯"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Visually demonstrate evaluating limits graphically.",
    "scene_description": "An interactive graph where a point slides along a curve, and a separate indicator shows the y-value being approached on the vertical axis as x approaches a specific value.",
    "script": "Watch how this graph shows us the limit. As our 'x' value slides closer to 2 on the horizontal axis, notice what 'y' value the function is getting closer and closer to! Even if there's a hole in the graph, we can see where it *wants* to be. 📈"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Explain evaluating limits numerically using a table of values.",
    "content": "To find a limit numerically, we create a table of values. We pick 'x' values very close to our target from both the left and the right. If the 'y' values in our table are getting closer to the same number, that's our limit! 🔢"
  },
  {
    "type": "text",
    "step_number": 5,
    "lesson_purpose": "Introduce the concept of one-sided limits.",
    "content": "**One-sided limits** are crucial! They describe what a function approaches as 'x' gets closer from *only one direction* – either from the left (x < a) or from the right (x > a). For a general limit to exist, both one-sided limits must be equal. 👈👉"
  },
  {
    "type": "video",
    "step_number": 6,
    "lesson_purpose": "Demonstrate the evaluation of limits analytically using direct substitution.",
    "scene_description": "A whiteboard animation showing a simple polynomial function, then substituting a value directly into it to find the limit.",
    "script": "For many 'well-behaved' functions, finding the limit is as simple as direct substitution! Just plug in the value 'x' is approaching. Let's see it in action with a simple polynomial. ✏️"
  },
  {
    "type": "interaction",
    "step_number": 7,
    "lesson_purpose": "Allow learners to practice evaluating limits using various methods.",
    "title": "Limit Explorer",
    "description": "Enter different functions and target values to see their limits calculated graphically, numerically, and analytically. Identify different types of discontinuities.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Limit Evaluation Tool</h3><input type='text' placeholder='Enter a function (e.g., x^2-4/x-2)' style='padding:10px; margin-bottom:10px; width:80%; border:1px solid #ccc; border-radius:5px;'><input type='number' placeholder='Target x value' style='padding:10px; width:80%; border:1px solid #ccc; border-radius:5px;'><button style='padding:10px 20px; background-color:#8e44ad; color:white; border:none; border-radius:5px;'>Evaluate Limit</button><p>Result: <span id='limitResult'></span></p><p>This is a placeholder for an interactive limit calculator/graphing tool.</p></body></html>",
    "explain": "This simulator helps you grasp limits by letting you experiment with different functions and see their behavior near specific points. Try functions with holes or jumps!"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the core ideas of limits, emphasizing their foundational role.",
    "content": "**Limits are the foundation of calculus!** 🏗️ They tell us what a function is *approaching*, even if it never quite gets there. Understanding them is key to derivatives, integrals, and beyond!"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of limit definitions and properties.",
    "questions": [
      {
        "question": "What does it mean for a limit to exist?",
        "options": [
          "The function is defined at that exact point.",
          "The function approaches the same value from both the left and the right.",
          "The function's graph has no holes.",
          "The function goes to infinity."
        ],
        "correct_answer": 1,
        "explanation": "For a limit to exist, the function's values must approach a single, finite value as the input approaches a specific point from both sides."
      },
      {
        "question": "Which of these is NOT a type of discontinuity?",
        "options": [
          "Removable discontinuity",
          "Jump discontinuity",
          "Infinite discontinuity",
          "Continuous discontinuity"
        ],
        "correct_answer": 3,
        "explanation": "Continuous discontinuity is not a recognized type. The main types are removable, jump, and infinite."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage further exploration and connect limits to real-world applications.",
    "content": "Fantastic work on understanding limits! This concept is fundamental to understanding motion, change, and complex systems in engineering, physics, and economics. Keep practicing, and you'll master this crucial topic! 🚀"
  }
];

// Main component for the Mathematics Limits Course
const MathematicsLimitsCourse = () => {
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
            <h3 className="text-2xl font-bold text-purple-700">{step.title}</h3> {/* Color for Mathematics theme */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-purple-50 p-6 rounded-md border border-purple-200 shadow-sm text-center"> {/* Color for Mathematics theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Color for Mathematics theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-purple-600 transition-colors duration-200"> {/* Color for Mathematics theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-purple-600 transition duration-150 ease-in-out" // Color for Mathematics theme
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
      {/* Subtle background gradients for visual flair, adapted for Mathematics theme */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-200 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600"> {/* Consistent gradient for Mathematics theme */}
          Understanding Limits
        </span>
      </h1>

      {/* Main Lesson Content Area */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 mb-8 shadow-lg relative z-10">
        {/* Step Progress and Purpose */}
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-xl font-semibold text-purple-800 mb-1"> {/* Consistent color for Mathematics theme */}
            Step {currentStepIndex + 1} / {LESSON_CONTENT.length}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-purple-700">Purpose:</span> {currentStep.lesson_purpose} {/* Consistent color for Mathematics theme */}
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
                        bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl
                        hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
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

export default MathematicsLimitsCourse;
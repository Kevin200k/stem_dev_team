import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for "Photosynthesis: Capturing Light Energy" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce photosynthesis as the process plants use to make food from light.",
    "scene_description": "Time-lapse of a plant growing, with sunlight shining on leaves and bubbles of oxygen appearing. Animated text: 'Plants make their own food!'",
    "script": "Ever wondered how plants get their energy? They're like tiny solar factories! They capture sunlight and turn it into food through an amazing process called Photosynthesis. Let's see how they do it! ☀️🌿"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define photosynthesis and explain its importance in the energy cycle.",
    "content": "**Photosynthesis** is the process by which green plants, algae, and some bacteria convert light energy into chemical energy (sugars), releasing oxygen as a byproduct. It's crucial for almost all life on Earth, forming the base of most food chains, and providing the oxygen we breathe! 🌎"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Identify the main structures involved in photosynthesis, especially chloroplasts.",
    "scene_description": "Zoom-in animation from a plant leaf to a cell, then to a chloroplast, highlighting its internal structures like thylakoids and grana.",
    "script": "The magic happens inside tiny organelles called **chloroplasts**, found mostly in plant leaves. These green powerhouses contain chlorophyll, the pigment that captures sunlight. See how perfectly designed they are for this vital job! 🍃"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Write the balanced chemical equation for photosynthesis.",
    "content": "The balanced chemical equation for photosynthesis is: <br/> **6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂** <br/> This means six molecules of carbon dioxide and six molecules of water, with light energy, produce one molecule of glucose (sugar) and six molecules of oxygen. 📝"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Explain the role of light, water, and carbon dioxide in the process.",
    "content": "**Light energy** powers the reaction. **Water (H₂O)** is absorbed by the roots and transported to the leaves. **Carbon dioxide (CO₂)** enters through small pores in the leaves called stomata. These are the essential ingredients for plants to make their food! 💧💨💡"
  },
  {
    "type": "text",
    "step_number": 6,
    "lesson_purpose": "Differentiate between light-dependent and light-independent (Calvin cycle) reactions.",
    "content": "Photosynthesis has two main stages: <br/> 1. **Light-dependent reactions**: Occur in the thylakoids (within chloroplasts), using light and water to produce ATP and NADPH (energy carriers) and releasing oxygen as a byproduct. <br/> 2. **Light-independent reactions (Calvin cycle)**: Occur in the stroma (fluid-filled space in chloroplasts), using the ATP, NADPH, and CO₂ to produce glucose. This part doesn't need light directly! ☀️➡️🍬"
  },
  {
    "type": "interaction",
    "step_number": 7,
    "lesson_purpose": "Allow learners to adjust environmental factors and see their impact on photosynthesis rate.",
    "title": "Photosynthesis Rate Simulator",
    "description": "Adjust sliders for light intensity, CO₂ concentration, and temperature to observe how the rate of photosynthesis changes. See the oxygen output visually!",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Photosynthesis Factors</h3><label>Light Intensity: <input type='range' min='0' max='100' value='50'></label><br/><label>CO2 Concentration: <input type='range' min='0' max='100' value='50'></label><br/><label>Temperature: <input type='range' min='0' max='100' value='50'></label><p style='margin-top:15px;'>Oxygen Output: <span style='font-weight:bold;'>█████</span></p><p>This is a placeholder for a simulator showing how factors affect photosynthesis.</p></body></html>",
    "explain": "Experiment with different conditions to understand how they limit or boost photosynthesis. It's all about finding the optimal balance for plant growth!"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the entire photosynthesis process and its global significance.",
    "content": "**Photosynthesis is the miracle of life!** ☀️🌿 It's how plants convert light, water, and CO₂ into food and oxygen, sustaining nearly all life on Earth. From tiny chloroplasts to global ecosystems, it's a vital process that supports us all! 🌍"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of photosynthesis components and processes.",
    "questions": [
      {
        "question": "What is the primary product of photosynthesis that provides energy for the plant?",
        "options": [
          "Carbon Dioxide",
          "Water",
          "Oxygen",
          "Glucose (Sugar)"
        ],
        "correct_answer": 3,
        "explanation": "Glucose (sugar) is the chemical energy produced during photosynthesis, which the plant uses for growth, reproduction, and other life processes."
      },
      {
        "question": "Which organelle is the primary site of photosynthesis in plant cells?",
        "options": [
          "Mitochondria",
          "Nucleus",
          "Chloroplast",
          "Ribosome"
        ],
        "correct_answer": 2,
        "explanation": "Chloroplasts contain chlorophyll and are the specialized organelles where photosynthesis takes place."
      },
      {
        "question": "Which of the following is NOT an input (reactant) for photosynthesis?",
        "options": [
          "Light Energy",
          "Water",
          "Oxygen",
          "Carbon Dioxide"
        ],
        "correct_answer": 2,
        "explanation": "Oxygen is a *product* of photosynthesis, not a reactant. Light energy, water, and carbon dioxide are the necessary inputs."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage appreciation for photosynthesis and its role in the environment.",
    "content": "You've now captured the essence of photosynthesis! This incredible process is not just about plants; it's about the air we breathe, the food we eat, and the intricate balance of our planet's ecosystems. Keep appreciating the green world around you! 💚"
  }
];

// Main component for the Biology Photosynthesis Course
const BiologyPhotosynthesisCourse = () => {
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
            <h3 className="text-2xl font-bold text-orange-700">{step.title}</h3> {/* Consistent color for Biology theme */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-orange-50 p-6 rounded-md border border-orange-200 shadow-sm text-center"> {/* Consistent color for Biology theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Consistent color for Biology theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-orange-600 transition-colors duration-200"> {/* Consistent color for Biology theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-orange-600 transition duration-150 ease-in-out" // Consistent color for Biology theme
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
      {/* Subtle background gradients for visual flair, adapted for Biology theme */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-yellow-600"> {/* Consistent gradient for Biology theme */}
          Photosynthesis: Capturing Light Energy
        </span>
      </h1>

      {/* Main Lesson Content Area */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 mb-8 shadow-lg relative z-10">
        {/* Step Progress and Purpose */}
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-xl font-semibold text-orange-800 mb-1"> {/* Consistent color for Biology theme */}
            Step {currentStepIndex + 1} / {LESSON_CONTENT.length}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-orange-700">Purpose:</span> {currentStep.lesson_purpose} {/* Consistent color for Biology theme */}
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
                        bg-gradient-to-r from-orange-600 to-yellow-500 text-white shadow-lg hover:shadow-xl
                        hover:from-orange-700 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
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

export default BiologyPhotosynthesisCourse;

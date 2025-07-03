import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Consequences and Aftermath" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce the profound global changes brought about by the end of WWII.",
    "scene_description": "A montage of post-WWII scenes: rubble in cities, formation of the UN, Berlin Wall construction, a map showing decolonization. Animated text: 'A World Transformed.'",
    "script": "World War II didn't just end; it fundamentally reshaped the entire planet. From political landscapes to human rights, its aftermath left an indelible mark. Let's explore the profound consequences and the new world that emerged. 🌍"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Analyze the immediate and long-term consequences of WWII on global politics and society.",
    "content": "The **immediate consequences** of WWII included widespread devastation, millions dead, and shattered economies. **Long-term consequences** were equally profound: a new global power balance, the rise of two superpowers (USA and USSR), and a fundamental shift in international relations and societal values. 💥"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Understand the creation of the United Nations and the beginning of the Cold War.",
    "scene_description": "Historical footage of the signing of the UN Charter, followed by visuals depicting the ideological divide of the Cold War (e.g., Iron Curtain map, nuclear arms race).",
    "script": "In the wake of the war, the **United Nations** was created to foster international cooperation and prevent future conflicts. However, almost immediately, the ideological clash between the capitalist West and the communist East led to the beginning of the **Cold War**, a new era of global tension. 🕊️🧊"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Explore the impact of the Holocaust and the Nuremberg Trials in establishing human rights standards.",
    "content": "The horrific scale of the **Holocaust** exposed the depths of human cruelty and led to a global commitment to human rights. The **Nuremberg Trials** held Nazi leaders accountable for war crimes and crimes against humanity, setting crucial precedents for international law and establishing new standards for human rights. ⚖️"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Evaluate the economic rebuilding of Europe under the Marshall Plan and Japan’s post-war transformation.",
    "content": "To prevent further instability, the U.S. launched the **Marshall Plan**, providing massive economic aid for Europe's rebuilding. Japan also underwent a remarkable post-war transformation, aided by U.S. occupation and reforms, emerging as an economic powerhouse. Listen to how these efforts reshaped economies. 🏗️"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to explore a map showing post-WWII geopolitical changes.",
    "title": "Post-WWII Global Map Explorer",
    "description": "Click on different regions (e.g., Europe, Asia, Africa) to see how political boundaries changed, and new alliances/blocs emerged after WWII.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Post-WWII Global Changes</h3><div style='border: 2px dashed #ccc; width: 300px; height: 200px; display: flex; justify-content: center; align-items: center; margin-bottom: 15px;'>Interactive Map Placeholder</div><div style='display:flex; flex-wrap:wrap; gap:10px;'><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Europe</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Asia</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Africa</button></div><p style='margin-top:15px;'>This is a placeholder for an interactive map showing geopolitical changes.</p></body></html>",
    "explain": "Explore how the world's political map was redrawn and new spheres of influence emerged after the war."
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Examine the decolonization wave and the shifting global balance of power.",
    "scene_description": "Animated map showing former colonial empires shrinking as new independent nations emerge in Asia and Africa. Visuals of independence celebrations.",
    "script": "WWII severely weakened European colonial powers, leading to a massive wave of **decolonization** across Asia and Africa. This period saw many nations gain independence, fundamentally **shifting the global balance of power** away from traditional European dominance and towards new centers of influence. ✊🏽🌍"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the major consequences and lasting impact of WWII.",
    "content": "**The consequences of WWII reshaped the 20th century and beyond.** From the establishment of the UN and the onset of the Cold War to the economic rebuilding of devastated nations and the global wave of decolonization, the war's aftermath created the modern world we know. 🌐"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of the consequences and aftermath of WWII.",
    "questions": [
      {
        "question": "Which international organization was created after WWII to promote peace and cooperation?",
        "options": [
          "League of Nations",
          "NATO",
          "United Nations",
          "Warsaw Pact"
        ],
        "correct_answer": 2,
        "explanation": "The United Nations was established in 1945 to prevent future global conflicts and foster international collaboration."
      },
      {
        "question": "The Marshall Plan was primarily designed to:",
        "options": [
          "Provide military aid to Asian countries.",
          "Rebuild the economies of Western European countries.",
          "Fund the development of atomic weapons.",
          "Establish new colonial empires."
        ],
        "correct_answer": 1,
        "explanation": "The Marshall Plan (officially the European Recovery Program) provided extensive economic aid to help rebuild Western European economies after WWII."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage critical thinking about the legacy of WWII.",
    "content": "You've now explored the profound and lasting consequences of World War II. Its legacy continues to influence global politics, human rights, and international relations. Critical reflection on this period is essential for understanding our contemporary world. ✨"
  }
];

// Main component for the History Consequences and Aftermath Course
const HistoryConsequencesAftermathCourse = () => {
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
            <h3 className="text-2xl font-bold text-blue-700">{step.title}</h3> {/* Consistent color for History theme */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-blue-50 p-6 rounded-md border border-blue-200 shadow-sm text-center"> {/* Consistent color for History theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Consistent color for History theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-blue-600 transition-colors duration-200"> {/* Consistent color for History theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out" // Consistent color for History theme
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
      {/* Subtle background gradients for visual flair, adapted for History theme */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-200 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600"> {/* Consistent gradient for History theme */}
          Consequences and Aftermath
        </span>
      </h1>

      {/* Main Lesson Content Area */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 mb-8 shadow-lg relative z-10">
        {/* Step Progress and Purpose */}
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-xl font-semibold text-blue-800 mb-1"> {/* Consistent color for History theme */}
            Step {currentStepIndex + 1} / {LESSON_CONTENT.length}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-blue-700">Purpose:</span> {currentStep.lesson_purpose} {/* Consistent color for History theme */}
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
                        bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:shadow-xl
                        hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
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

export default HistoryConsequencesAftermathCourse;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "World War II: A Global Perspective" lesson
const LESSON_CONTENT = [
  {
    "type": "text", // Changed from video for a textual introduction
    "step_number": 1,
    "lesson_purpose": "Set the stage for understanding the complex origins of World War II.",
    "content": "World War II, a conflict that reshaped the globe, didn't begin overnight. It was the culmination of deep-seated tensions, unresolved issues from previous conflicts, and the rise of dangerous ideologies. Let's explore the causes that ignited this global fire. 🔥"
  },
  {
    "type": "video",
    "step_number": 2,
    "lesson_purpose": "Analyze the long-term causes of World War II including the Treaty of Versailles, the Great Depression, and the rise of totalitarian regimes.",
    "scene_description": "Historical footage/animations showing the signing of the Treaty of Versailles, scenes of economic hardship during the Great Depression, and propaganda posters/rallies of totalitarian leaders (Hitler, Mussolini).",
    "script": "The Treaty of Versailles left Germany resentful. The Great Depression plunged the world into economic chaos. And then, totalitarian leaders like Hitler and Mussolini rose to power, promising solutions but leading to disaster. See how these factors intertwined. 🌍"
  },
  {
    "type": "text",
    "step_number": 3,
    "lesson_purpose": "Examine how nationalism, expansionism, and fascism contributed to tensions in Europe and Asia.",
    "content": "**Extreme nationalism** fueled desires for territorial expansion. **Fascism** glorified the state and suppressed opposition. In Asia, Japan's **expansionism** mirrored European aggression. These ideologies created a volatile mix, pushing nations towards conflict. ⚔️"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Evaluate the failure of appeasement and the role of the League of Nations.",
    "content": "The **League of Nations**, created to prevent war, proved ineffective. The policy of **appeasement**, where Allied powers conceded to aggressive demands in hopes of avoiding war, only emboldened leaders like Hitler. Hear how these failures paved the way for escalation. 🎙️"
  },
  {
    "type": "video",
    "step_number": 5,
    "lesson_purpose": "Understand the invasion of Poland in 1939 and its immediate trigger effect on the war.",
    "scene_description": "Animated map showing German forces invading Poland from multiple directions, followed by declarations of war from Britain and France.",
    "script": "The final spark: On September 1, 1939, Germany invaded Poland. This act of aggression was the immediate trigger, finally forcing Britain and France to declare war, marking the official start of World War II. 💥"
  },
  {
    "type": "text",
    "step_number": 6,
    "lesson_purpose": "Trace the major military campaigns in the European theater: Blitzkrieg, Battle of Britain, Operation Barbarossa, and D-Day.",
    "content": "The **European Theater** saw rapid, devastating campaigns. Germany's **Blitzkrieg** overwhelmed opponents. The **Battle of Britain** was fought in the skies. **Operation Barbarossa** opened the brutal Eastern Front, and **D-Day** marked the critical Allied invasion of Normandy. 🛡️"
  },
  {
    "type": "interaction",
    "step_number": 7,
    "lesson_purpose": "Allow learners to explore a timeline of key European WWII events.",
    "title": "European Theater Timeline",
    "description": "Click on different events (e.g., Fall of France, Stalingrad, D-Day) to see short descriptions and their strategic importance.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>European WWII Key Events</h3><div style='display:flex; gap:10px; margin-bottom:15px;'><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Battle of Britain</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Stalingrad</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>D-Day</button></div><p>Click an event to learn more. This is a placeholder for an interactive timeline.</p></body></html>",
    "explain": "Explore the sequence and significance of major European campaigns, understanding the flow of the war."
  },
  {
    "type": "video",
    "step_number": 8,
    "lesson_purpose": "Identify the key battles in the Pacific: Pearl Harbor, Midway, Guadalcanal, Iwo Jima, and Okinawa.",
    "scene_description": "Animated map showing Japanese expansion, then key battle locations flashing on a map of the Pacific, with brief visuals of naval and island combat.",
    "script": "Across the globe, the **Pacific Theater** raged. From the surprise attack on **Pearl Harbor** to the pivotal naval victory at **Midway**, and the brutal island-hopping campaigns of **Guadalcanal**, **Iwo Jima**, and **Okinawa**, the war in the Pacific was fiercely fought. 🌊"
  },
  {
    "type": "text",
    "step_number": 9,
    "lesson_purpose": "Examine the role of island-hopping strategy and its impact on the war’s progression.",
    "content": "The Allied 'island-hopping' strategy was key in the Pacific. Instead of capturing every island, they bypassed heavily fortified ones to seize strategically important islands, cutting off Japanese supply lines and moving closer to Japan. 🏝️"
  },
  {
    "type": "summary",
    "step_number": 10,
    "lesson_purpose": "Recap the major theaters and turning points of the war.",
    "content": "**WWII was a global conflict** fought across multiple theaters. From the Blitzkrieg in Europe to island-hopping in the Pacific, it involved unprecedented military strategies and human cost. 🗺️"
  },
  {
    "type": "quiz",
    "step_number": 11,
    "lesson_purpose": "Check understanding of key events and concepts from WWII.",
    "questions": [
      {
        "question": "Which event is considered the immediate trigger for the start of World War II in Europe?",
        "options": [
          "The Great Depression",
          "The invasion of Poland",
          "The attack on Pearl Harbor",
          "The signing of the Treaty of Versailles"
        ],
        "correct_answer": 1,
        "explanation": "The German invasion of Poland on September 1, 1939, directly led to declarations of war by Britain and France."
      },
      {
        "question": "What was the primary goal of the 'island-hopping' strategy in the Pacific Theater?",
        "options": [
          "To capture every Japanese-held island.",
          "To establish new trade routes.",
          "To bypass heavily fortified islands and seize strategic ones closer to Japan.",
          "To find new resources for the Allied war effort."
        ],
        "correct_answer": 2,
        "explanation": "Island-hopping aimed to efficiently advance towards Japan by focusing on key strategic locations, rather than engaging in costly battles for every island."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 12,
    "lesson_purpose": "Encourage reflection on the broader impact of WWII.",
    "content": "Understanding World War II isn't just about dates and battles; it's about learning from history's most devastating conflict. Its consequences shaped the modern world, from global politics to human rights. Keep exploring! 🕊️"
  }
];

// Main component for the History WWII Course
const HistoryWWIIcourse = () => {
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
            <h3 className="text-2xl font-bold text-blue-700">{step.title}</h3> {/* Adjusted color for History theme */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-blue-50 p-6 rounded-md border border-blue-200 shadow-sm text-center"> {/* Adjusted color for History theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Adjusted color for History theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-blue-600 transition-colors duration-200"> {/* Adjusted color for History theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out" // Adjusted color for History theme
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
          World War II: A Global Perspective
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
                        bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg hover:shadow-xl {/* Adjusted gradient for History theme */}
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

export default HistoryWWIIcourse;

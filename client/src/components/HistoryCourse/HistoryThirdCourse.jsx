import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "The Pacific Theater" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce the Pacific Theater with visuals of vast ocean and island battles.",
    "scene_description": "Historical footage of naval fleets, island landscapes, and early aerial combat in the Pacific. Animated text: 'The War in the Pacific: An Ocean of Conflict.'",
    "script": "Far across the globe, another vast front of World War II raged: the Pacific Theater. Characterized by immense naval battles, brutal island campaigns, and fierce aerial combat, this theater was a struggle for control over vast ocean expanses and strategic islands. Let's explore it! 🌊🏝️"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Understand Japan’s imperial goals and their expansion across Asia.",
    "content": "Before and during the war, Japan harbored significant **imperial goals**, seeking to establish a 'Greater East Asia Co-Prosperity Sphere.' This ambition led to aggressive **expansion across Asia**, including invasions of China, Indochina, and other Pacific territories, setting the stage for conflict with Allied powers. 🇯🇵"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Identify the key battles in the Pacific: Pearl Harbor, Midway, Guadalcanal, Iwo Jima, and Okinawa.",
    "scene_description": "Animated map highlighting the locations of Pearl Harbor, Midway Atoll, Guadalcanal, Iwo Jima, and Okinawa, with brief visuals of each battle.",
    "script": "The Pacific Theater saw a series of critical battles: the surprise attack on **Pearl Harbor**, the pivotal naval victory at **Midway**, the grueling jungle fighting on **Guadalcanal**, and the fierce island assaults of **Iwo Jima** and **Okinawa**. Each was a turning point in its own right. 💥"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Examine the role of island-hopping strategy and its impact on the war’s progression.",
    "content": "The Allied forces adopted an 'island-hopping' (or leapfrogging) strategy. Instead of capturing every Japanese-held island, they bypassed heavily fortified ones to seize strategically important islands, cutting off Japanese supply lines and establishing airbases closer to mainland Japan. This strategy significantly accelerated the war's progression. 🏝️➡️✈️"
  },
  {
    "type": "audio",
    "step_number": 5,

    "lesson_purpose": "Explore the use of kamikaze tactics and the cultural influences behind them.",
    "content": "Towards the end of the war, Japan introduced **kamikaze tactics**, where pilots would intentionally crash their explosive-laden planes into Allied warships. This desperate strategy was deeply rooted in Japanese cultural values of honor, sacrifice, and loyalty to the Emperor. Listen to understand the context and impact of these attacks. 🎙️"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to explore a timeline of key Pacific WWII events.",
    "title": "Pacific Theater Interactive Timeline",
    "description": "Click on different events (e.g., Pearl Harbor, Battle of Midway, Iwo Jima) to see short descriptions and their strategic importance.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Pacific WWII Key Events</h3><div style='display:flex; flex-wrap:wrap; gap:10px; margin-bottom:15px;'><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Pearl Harbor</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Midway</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Guadalcanal</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Iwo Jima</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Okinawa</button></div><p id='eventInfo' style='margin-top:15px; text-align:center; max-width: 400px;'>Click an event to learn more about its historical context and significance.</p><script>const events = { 'Pearl Harbor': 'A surprise attack by the Imperial Japanese Navy Air Service on the U.S. naval base at Pearl Harbor, Hawaii, on December 7, 1941, leading to the U.S. entry into WWII.', 'Midway': 'A decisive naval battle in June 1942, where the U.S. Navy defeated an attacking fleet of the Imperial Japanese Navy, marking a turning point in the Pacific War.', 'Guadalcanal': 'The first major Allied offensive in the Pacific, a brutal and prolonged campaign (1942-1943) to secure the island of Guadalcanal.', 'Iwo Jima': 'A major battle in February-March 1945, where the U.S. Marines captured the island of Iwo Jima from the Imperial Japanese Army after fierce fighting.', 'Okinawa': 'The largest amphibious assault in the Pacific Theater, fought from April-June 1945, and one of the bloodiest battles of the war.' }; document.querySelectorAll('button').forEach(button => { button.addEventListener('click', () => { document.getElementById('eventInfo').innerText = events[button.innerText]; }); });</script></body></html>",
    "explain": "Interact with key events to deepen your understanding of their sequence and impact on the Pacific Theater."
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Evaluate the decision to drop atomic bombs on Hiroshima and Nagasaki and the controversy surrounding it.",
    "scene_description": "Archival footage of the mushroom clouds over Hiroshima and Nagasaki, followed by a brief visual of the aftermath and then a discussion of the ethical debate.",
    "script": "The war in the Pacific concluded with a devastating decision: the dropping of atomic bombs on **Hiroshima** and **Nagasaki**. This act led to Japan's surrender but remains one of the most controversial events in history, sparking debates about its necessity and ethical implications. ☢️"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the major aspects of the Pacific Theater.",
    "content": "**The Pacific Theater was a unique and brutal front of WWII**, shaped by Japan's imperial ambitions, the strategic island-hopping campaign, desperate tactics like kamikaze attacks, and ultimately, the atomic bombs. Its legacy continues to influence global relations. 🌏"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of key events and strategies in the Pacific Theater.",
    "questions": [
      {
        "question": "Which battle is considered a major turning point in the Pacific War, crippling Japan's naval air power?",
        "options": [
          "Pearl Harbor",
          "Guadalcanal",
          "Midway",
          "Okinawa"
        ],
        "correct_answer": 2,
        "explanation": "The Battle of Midway was a decisive victory for the U.S. Navy and a major turning point in the Pacific Theater."
      },
      {
        "question": "What was the main goal of the Allied 'island-hopping' strategy?",
        "options": [
          "To capture every island held by Japan.",
          "To establish trade routes with China.",
          "To bypass heavily fortified islands and seize strategic ones closer to Japan.",
          "To develop new naval technologies."
        ],
        "correct_answer": 2,
        "explanation": "Island-hopping aimed to efficiently advance towards Japan by focusing on key strategic locations, rather than engaging in costly battles for every island."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage reflection on the broader impact of the Pacific War.",
    "content": "You've now explored the complex and impactful history of the Pacific Theater. Its events, from strategic battles to ethical dilemmas, continue to shape our understanding of warfare and humanity. Keep reflecting on these critical moments. 🕊️"
  }
];

// Main component for the History Pacific Theater Course
const HistoryPacificTheaterCourseNew = () => {
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
          The Pacific Theater
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

export default HistoryPacificTheaterCourseNew;

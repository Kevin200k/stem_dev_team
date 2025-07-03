import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Major Campaigns (European Theater)" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce the European Theater with dramatic visuals of key campaigns.",
    "scene_description": "A montage of historical footage: Blitzkrieg tanks, Battle of Britain dogfights, snowy Eastern Front, D-Day landings. Animated text: 'The War in Europe: A Battlefield of Giants.'",
    "script": "The European Theater was where some of World War II's most decisive and brutal campaigns unfolded. From lightning-fast invasions to epic aerial battles and massive ground offensives, this front saw unprecedented military action. Let's trace these major campaigns! 🛡️"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Trace the major military campaigns in the European theater: Blitzkrieg, Battle of Britain, Operation Barbarossa, and D-Day.",
    "content": "The **European Theater** was defined by several pivotal campaigns: Germany's devastating **Blitzkrieg** tactics, the aerial combat of the **Battle of Britain**, the vast and brutal **Operation Barbarossa** (invasion of the Soviet Union), and the crucial Allied invasion on **D-Day**. Each marked a significant phase of the war. 🗺️"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Understand the strategic significance of Allied and Axis moves in Western and Eastern Europe.",
    "scene_description": "Animated maps showing the rapid German advances in Western Europe (France, Low Countries), then the massive scale of the Eastern Front, and finally Allied pushes from the West and East.",
    "script": "Every move had strategic importance. The Axis aimed for rapid conquest, while the Allies sought to contain and then push back. The Eastern Front became a brutal war of attrition, while the Western Front saw massive amphibious assaults. See the grand strategy unfold! 🌐"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Analyze the impact of air warfare, naval blockades, and tank battles on the course of the war.",
    "content": "Technology transformed warfare. **Air warfare** dominated the skies, from strategic bombing to dogfights. **Naval blockades** crippled supply lines. And massive **tank battles** reshaped ground combat. These innovations had a profound impact on the war's progression and outcomes. ✈️🚢 Panzer"
  },
  {
    "type": "text",
    "step_number": 5,
    "lesson_purpose": "Explore the role of resistance movements and underground operations across occupied countries.",
    "content": "Even under occupation, hope persisted. **Resistance movements** and **underground operations** played a vital role, conducting sabotage, intelligence gathering, and aiding Allied forces. From the French Maquis to the Polish Home Army, their courage was instrumental. ✊"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to explore a timeline of key European WWII events.",
    "title": "European Theater Interactive Timeline",
    "description": "Click on different events (e.g., Fall of France, Stalingrad, D-Day, Liberation of Paris) to see short descriptions and their strategic importance.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>European WWII Key Events</h3><div style='display:flex; flex-wrap:wrap; gap:10px; margin-bottom:15px;'><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Blitzkrieg</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Battle of Britain</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Operation Barbarossa</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>D-Day</button><button style='padding:8px 15px; background-color:#1e90ff; color:white; border:none; border-radius:5px;'>Liberation of Paris</button></div><p id='eventInfo' style='margin-top:15px; text-align:center; max-width: 400px;'>Click an event to learn more about its historical context and significance.</p><script>const events = { 'Blitzkrieg': 'Germany\'s <b>lightning war</b> strategy, characterized by rapid, coordinated attacks using tanks and air power.', 'Battle of Britain': 'A prolonged aerial combat campaign in 1940, where the RAF successfully defended the UK against large-scale attacks by the Luftwaffe.', 'Operation Barbarossa': 'Germany\'s surprise invasion of the Soviet Union in June 1941, opening the Eastern Front and becoming the largest land invasion in history.', 'D-Day': 'The Allied invasion of Normandy on June 6, 1944, marking the largest amphibious invasion in history and the beginning of the liberation of Western Europe.', 'Liberation of Paris': 'The Allied and French Resistance liberation of Paris from Nazi occupation in August 1944, a symbolic victory.' }; document.querySelectorAll('button').forEach(button => { button.addEventListener('click', () => { document.getElementById('eventInfo').innerText = events[button.innerText]; }); });</script></body></html>",
    "explain": "Interact with key events to deepen your understanding of their sequence and impact on the European Theater."
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Study the liberation of Paris and the final push into Nazi Germany.",
    "scene_description": "Archival footage of the liberation of Paris, joyous crowds, then Allied forces advancing through Germany, culminating in the fall of Berlin.",
    "script": "The **liberation of Paris** was a powerful symbol of hope. From there, the Allied forces made their final, relentless push into Nazi Germany, culminating in fierce battles and the eventual fall of Berlin, bringing an end to the war in Europe. 🇫�🇩🇪"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the major European campaigns and their significance.",
    "content": "**The European Theater was a crucible of conflict**, marked by innovative tactics like the Blitzkrieg, monumental struggles like the Battle of Britain and Operation Barbarossa, and the decisive D-Day invasion. The courage of resistance movements and the final Allied push ultimately led to victory. 🎖️"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of major European WWII campaigns.",
    "questions": [
      {
        "question": "Which military campaign involved a massive amphibious invasion of Normandy?",
        "options": [
          "Blitzkrieg",
          "Battle of Britain",
          "Operation Barbarossa",
          "D-Day"
        ],
        "correct_answer": 3,
        "explanation": "D-Day (June 6, 1944) was the Allied invasion of Normandy, a critical turning point in Western Europe."
      },
      {
        "question": "What was the primary characteristic of Germany's 'Blitzkrieg' strategy?",
        "options": [
          "Slow, defensive trench warfare.",
          "Rapid, coordinated attacks using tanks and air power.",
          "Naval blockades and submarine warfare.",
          "Guerrilla warfare by resistance movements."
        ],
        "correct_answer": 1,
        "explanation": "Blitzkrieg, or 'lightning war,' relied on speed and surprise, using combined arms to overwhelm enemy defenses quickly."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage reflection on the human impact and lessons from these campaigns.",
    "content": "Understanding these major campaigns helps us grasp the scale and complexity of WWII. Beyond the strategies, remember the immense human cost and the resilience of those who fought. History offers invaluable lessons for peace. 🕊️"
  }
];

// Main component for the History European Campaigns Course
const HistoryEuropeanCampaignsCourse = () => {
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
          Major Campaigns (European Theater)
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

export default HistoryEuropeanCampaignsCourse;
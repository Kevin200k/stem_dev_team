import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Analyzing Themes" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Capture learners' attention with a relatable concept of underlying messages.",
    "scene_description": "A person watching a movie, then having a 'lightbulb moment' about its deeper meaning, or seeing a hidden message in a picture.",
    "script": "Ever watched a movie or read a book and felt there was a deeper message, something beyond the surface story? 🤔 That's often what we call a theme! Let's uncover them!"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define literary theme and differentiate from plot or subject.",
    "content": "A **theme** in literature is the central idea or underlying message that the author wants to convey. It's usually a universal truth or observation about life, society, or human nature, not just what happens in the plot. For example, 'love' is a subject, but 'unconditional love conquers all' is a theme. ❤️"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Illustrate how major and minor themes develop in a narrative.",
    "scene_description": "An animated timeline of a story, highlighting moments where a major theme (e.g., courage) is shown prominently, and a minor theme (e.g., friendship) appears subtly.",
    "script": "Themes aren't always obvious from the start. They develop throughout the story. Major themes are the big ideas, while minor themes are secondary. See how 'courage' is a major theme here, while 'the importance of family' is a quieter, minor one. 📖"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Explain how literary devices contribute to theme development.",
    "content": "Authors use various literary devices to build and convey themes. Think about **symbolism** (a dove representing peace), **motifs** (recurring images or ideas), **irony**, and **metaphors**. These aren't just fancy words; they're tools to deepen the message! ✍️"
  },
  {
    "type": "text",
    "step_number": 5,
    "lesson_purpose": "Connect themes to broader historical, cultural, and societal contexts.",
    "content": "Themes don't exist in a vacuum! Understanding the **historical, cultural, and societal context** in which a work was created can reveal deeper layers of its themes. For instance, a story about freedom written during a period of oppression will carry a different weight. 🌍"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Provide an interactive exercise for identifying themes and supporting evidence.",
    "title": "Theme Investigator",
    "description": "Read a short passage and identify its main theme. Then, select textual evidence that supports your interpretation.",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Theme Investigator</h3><p style='font-style: italic; margin-bottom: 15px;'>\"The old woman sat by the window, watching the rain. Each drop seemed to carry a memory, a whisper of a life lived fully, despite the hardships. Her hands, gnarled with age, still held the warmth of countless embraces.\"</p><input type='text' placeholder='What is a possible theme?' style='padding:10px; margin-bottom:10px; width:90%; border:1px solid #ccc; border-radius:5px;'><button style='padding:10px 20px; background-color:#d70081; color:white; border:none; border-radius:5px;'>Submit Theme</button><p style='margin-top:15px;'>This is a placeholder for an interactive text analysis tool.</p></body></html>",
    "explain": "Practice identifying themes and backing them up with evidence. This skill is crucial for strong literary analysis!"
  },
  {
    "type": "summary",
    "step_number": 7,
    "lesson_purpose": "Recap the essence of theme analysis.",
    "content": "**Themes are the heart of literature!** ❤️ They are the universal messages authors weave into their stories, revealed through plot, characters, and literary devices. Analyzing them helps us connect with the deeper meaning of a text. 📚"
  },
  {
    "type": "quiz",
    "step_number": 8,
    "lesson_purpose": "Check understanding of theme identification and analysis.",
    "questions": [
      {
        "question": "Which best describes a literary theme?",
        "options": [
          "The main character's name.",
          "The sequence of events in a story.",
          "A universal message or idea explored in the text.",
          "The setting where the story takes place."
        ],
        "correct_answer": 2,
        "explanation": "A theme is a central, universal idea or message that the author conveys through the narrative."
      },
      {
        "question": "An author using a recurring image of a wilting flower to represent fading hope is an example of what literary device?",
        "options": [
          "Metaphor",
          "Irony",
          "Symbolism",
          "Alliteration"
        ],
        "correct_answer": 2,
        "explanation": "Using an object (wilting flower) to represent an abstract idea (fading hope) is symbolism."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 9,
    "lesson_purpose": "Encourage learners to apply theme analysis to their own reading.",
    "content": "Now that you're a theme detective, try applying these skills to your favorite books, movies, or even songs! The more you practice, the better you'll become at uncovering those hidden gems of meaning. 🕵️‍♀️"
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Provide encouragement and emphasize the value of literary analysis.",
    "content": "Excellent work on analyzing themes! This skill not only deepens your appreciation for literature but also enhances your critical thinking about the world around you. Keep reading, keep analyzing! ✨"
  }
];

// Main component for the English Course UI
const EnglishCourseUI = () => {
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
            <h3 className="text-2xl font-bold text-pink-700">{step.title}</h3> {/* English theme color */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-pink-50 p-6 rounded-md border border-pink-200 shadow-sm text-center"> {/* English theme color */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-pink-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* English theme color */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-pink-600 transition-colors duration-200"> {/* English theme color */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-pink-600 transition duration-150 ease-in-out" // English theme color
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
      {/* Subtle background gradients for visual flair, adapted for English theme */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-purple-600"> {/* English theme gradient */}
          Analyzing Themes
        </span>
      </h1>

      {/* Main Lesson Content Area */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 mb-8 shadow-lg relative z-10">
        {/* Step Progress and Purpose */}
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-xl font-semibold text-pink-800 mb-1"> {/* English theme color */}
            Step {currentStepIndex + 1} / {LESSON_CONTENT.length}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-pink-700">Purpose:</span> {currentStep.lesson_purpose} {/* English theme color */}
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
                        bg-gradient-to-r from-pink-600 to-purple-500 text-white shadow-lg hover:shadow-xl
                        hover:from-pink-700 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
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

export default EnglishCourseUI;

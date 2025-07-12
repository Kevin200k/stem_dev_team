import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for "The Scientific Method" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Engage learners with the idea of solving mysteries through observation.",
    "scene_description": "A detective looking at clues, a scientist observing a phenomenon in nature (e.g., a plant growing unusually fast).",
    "script": "Ever wondered how scientists figure things out? It's not magic, it's a method! Like a detective solving a mystery, scientists follow a logical path. Let's uncover the secrets of the Scientific Method! 🕵️‍♀️"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Understand the steps of the scientific method: observation, hypothesis, experimentation, data analysis, and conclusion.",
    "content": "The **Scientific Method** begins with an **observation** – noticing something interesting. Then, we form a **hypothesis**, which is a testable explanation for our observation. Next, we design an **experiment** to test that hypothesis. After collecting data, we **analyze** it and draw a **conclusion**. 🧪"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Differentiate between independent, dependent, and controlled variables in an experiment.",
    "scene_description": "An animation of plants growing under different light conditions. One plant has varying light (independent), another shows growth (dependent), and others have constant factors (controlled).",
    "script": "In an experiment, we work with variables! The **independent variable** is what *we change* (like light intensity). The **dependent variable** is what *we measure* (like plant height). And **controlled variables** are what *we keep the same* to ensure a fair test and reliable results! 🌱"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Develop testable hypotheses and design basic experiments.",
    "content": "A strong hypothesis is specific, testable, and often follows an 'If... then... because...' format. For instance: 'If I increase the amount of water given to a plant, then its growth will increase, because water is essential for plant processes.' Designing an experiment involves planning how to test this hypothesis by manipulating variables. ✅"
  },
  {
    "type": "text",
    "step_number": 5,
    "lesson_purpose": "Analyze and interpret data to draw logical conclusions.",
    "content": "Once an experiment is complete, the next crucial step is **data analysis**. We organize, summarize, and interpret the collected data to look for patterns, trends, or relationships. Based on this interpretation, we then formulate a **conclusion** that either supports or refutes our initial hypothesis. 📊"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to design a simple experiment by identifying variables and formulating a hypothesis.",
    "title": "Experiment Design Challenge",
    "description": "Given a scenario, identify the independent, dependent, and controlled variables, and formulate a testable hypothesis. Submit your design to see feedback!",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Design Your Experiment</h3><p style='font-style: italic; margin-bottom: 15px;'>Scenario: You want to investigate if different types of music affect students' concentration during a study session.</p><input type='text' placeholder='Independent Variable?' style='padding:10px; margin-bottom:10px; width:90%; border:1px solid #ccc; border-radius:5px;'><input type='text' placeholder='Dependent Variable?' style='padding:10px; margin-bottom:10px; width:90%; border:1px solid #ccc; border-radius:5px;'><input type='text' placeholder='Controlled Variables (list a few)?' style='padding:10px; margin-bottom:10px; width:90%; border:1px solid #ccc; border-radius:5px;'><textarea placeholder='Formulate your Hypothesis (If...then...because...)' style='padding:10px; margin-bottom:10px; width:90%; height:80px; border:1px solid #ccc; border-radius:5px;'></textarea><button style='padding:10px 20px; background-color:#FFA500; color:white; border:none; border-radius:5px;'>Check My Design</button><p style='margin-top:15px;'>This is a placeholder for an interactive experiment design tool.</p></body></html>",
    "explain": "This interactive exercise helps you practice the core skills of scientific inquiry: identifying variables and crafting hypotheses. It's the foundation of any good experiment!"
  },
  {
    "type": "text",
    "step_number": 7,
    "lesson_purpose": "Distinguish between scientific theory and law.",
    "content": "In science, a **theory** is a well-substantiated explanation of some aspect of the natural world, supported by a vast body of evidence from many experiments and observations (e.g., Theory of Evolution). A **law** describes an observed phenomenon but doesn't explain *why* it happens (e.g., Law of Gravity). Importantly, theories do not 'become' laws; they are different types of scientific statements. 🧐"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the importance and steps of the scientific method.",
    "content": "**The Scientific Method is your roadmap to discovery!** 🗺️ It's a systematic, logical approach to understanding the natural world, moving from observation to testable hypotheses, rigorous experimentation, careful data analysis, and evidence-based conclusions. It's how science builds reliable knowledge! 🔬"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of the scientific method steps and variables.",
    "questions": [
      {
        "question": "Which step typically comes *after* making an observation but *before* conducting an experiment?",
        "options": [
          "Data Analysis",
          "Formulating a Hypothesis",
          "Drawing a Conclusion",
          "Identifying Controlled Variables"
        ],
        "correct_answer": 1,
        "explanation": "After an observation, scientists typically formulate a testable hypothesis to explain what they observed, before designing an experiment to test it."
      },
      {
        "question": "In an experiment investigating if different amounts of sunlight affect plant growth, what would be the independent variable?",
        "options": [
          "The type of plant used",
          "The amount of water given to the plant",
          "The amount of sunlight the plant receives",
          "The height of the plant after a month"
        ],
        "correct_answer": 2,
        "explanation": "The independent variable is the factor that is intentionally changed or manipulated by the experimenter. In this case, it's the amount of sunlight."
      },
      {
        "question": "A scientific law primarily does what?",
        "options": [
          "Explains why a phenomenon occurs.",
          "Describes a phenomenon that consistently occurs under certain conditions.",
          "Is a preliminary guess that needs further testing.",
          "Can eventually evolve into a scientific theory."
        ],
        "correct_answer": 1,
        "explanation": "A scientific law describes an observed phenomenon, often mathematically, but does not explain the underlying reasons for it. Theories provide the explanations."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage applying scientific thinking to everyday life.",
    "content": "You've now mastered the core principles of the Scientific Method! Remember, this logical and evidence-based way of thinking isn't just for scientists in labs; you can apply it to troubleshoot everyday problems, make informed decisions, and critically evaluate information. Keep asking questions and seeking answers! ✨"
  }
];

// Main component for the Biology Scientific Method Course
const BiologyScientificMethodCourseNew = () => {
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
            <h3 className="text-2xl font-bold text-orange-700">{step.title}</h3> {/* Adjusted color for Biology theme */}
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-orange-50 p-6 rounded-md border border-orange-200 shadow-sm text-center"> {/* Adjusted color for Biology theme */}
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3> {/* Adjusted color for Biology theme */}
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-orange-600 transition-colors duration-200"> {/* Adjusted color for Biology theme */}
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-orange-600 transition duration-150 ease-in-out" // Adjusted color for Biology theme
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
          The Scientific Method
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

export default BiologyScientificMethodCourseNew;

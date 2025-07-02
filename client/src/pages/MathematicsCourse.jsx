import React, { useState } from 'react';

// The JSON data provided, embedded directly into the component
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Catch learners' attention with a fascinating introduction to derivatives.",
    "scene_description": "A rolling car on a hill with a speedometer and graphs in the background.",
    "script": "Look! The car is moving, and its speed changes"
  },
  {
    "type": "video",
    "step_number": 1, // Note: duplicate step_number, UI will treat this as distinct
    "lesson_purpose": "Catch learners' attention with a fascinating introduction to derivatives.",
    "scene_description": "A rolling car on a hill with a speedometer and graphs in the background.",
    "script": "Ready, set, roll! 🏎️ As the car rolls, its speed changes. How can we measure this change? 🤔"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Explain the concept of derivatives as the instantaneous rate of change.",
    "content": "Derivatives help us understand how things change at any moment. It's like capturing a snapshot of the car's speed at a specific point in its journey. 📸"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Use a relatable example to introduce the concept of limit definition.",
    "scene_description": "A taxi moving along a straight road with a speedometer.",
    "script": "Imagine you're in a taxi moving at constant speed. The speedometer gives you your speed. Now, imagine slowing down to a certain point and asking about your speed at that exact moment. 🚕"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Provide a memory aid using an acronym.",
    "content": "Remember the acronym 'MIT' as a reminder of the 'instant rate of change' for the derivative formula. 📝"
  },
  {
    "type": "video",
    "step_number": 5,
    "lesson_purpose": "Demonstrate the concept of limits using a visual example.",
    "scene_description": "A zooming-in animation on a graph showing the tangent line's slope.",
    "script": "Check out how this graph zooms in on the tangent line's slope. We can see the instantaneous rate of change! 🔍"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to practice finding derivatives using limit rules.",
    "title": "Derivatives Simulator",
    "description": "Input a function and adjust the slider to explore how the derivative changes. 📊",
    "working_code": "<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; }</style></head><body><h3>Simple Function Slider</h3><input type='range' min='0' max='100' value='50' oninput='document.getElementById(\"rangeValue\").innerText=this.value'><p>Value: <span id='rangeValue'>50</span></p><p>This is a placeholder for a more complex interactive element like a derivative calculator or graph.</p></body></html>",
    "explain": "This simulator illustrates the limit definition of derivatives by adjusting the input function."
  },
  {
    "type": "summary",
    "step_number": 7,
    "lesson_purpose": "Recap the core idea using bold words and emojis.",
    "content": "**Derivatives are the speed of change!** 🏎️ They help us capture the instantaneous rate of change, just like the speedometer in our taxi ride."
  },
  {
    "type": "quiz",
    "step_number": 8,
    "lesson_purpose": "Check understanding with multiple-choice questions.",
    "questions": [
      {
        "question": "What does a derivative measure?",
        "options": ["The position of an object", "The speed of an object", "The direction of an object"],
        "correct_answer": 1,
        "explanation": "A derivative measures the instantaneous rate of change or the speed of an object."
      },
      {
        "question": "What does the limit definition of a derivative represent?",
        "options": ["The average rate of change", "The instantaneous rate of change", "The maximum rate of change"],
        "correct_answer": 1,
        "explanation": "The limit definition of a derivative represents the instantaneous rate of change."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 9,
    "lesson_purpose": "Show real-world applications of derivatives.",
    "content": "Derivatives help us analyze and make predictions in physics, economics, and more. Imagine using derivatives to optimize the speed of your car or the trajectory of a projectile! 🚀"
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage learners and adapt to their progress.",
    "content": "Great job exploring derivatives! Keep practicing, and soon you'll become a master of speed and change! 😊 Remember, the AI adapts to your progress to help you improve."
  }
];

const MathematicsCourse = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = LESSON_CONTENT[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < LESSON_CONTENT.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

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
            <h3 className="text-2xl font-bold text-purple-700">{step.title}</h3>
            <p className="text-gray-700 text-lg">{step.description}</p>
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
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
          <p className="text-gray-800 leading-relaxed text-xl font-bold bg-purple-50 p-6 rounded-md border border-purple-200 shadow-sm text-center">
            {step.content}
          </p>
        );
      case 'quiz':
        return (
          <div className="space-y-6 px-4 py-2">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">{step.lesson_purpose || 'Quick Quiz!'}</h3>
            {step.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 transition-all duration-200 hover:shadow-lg">
                <p className="text-xl font-semibold text-gray-800 mb-4">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center text-gray-700 cursor-pointer text-lg hover:text-purple-600 transition-colors duration-200">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        className="form-radio h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
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
    <div className="min-w-4xl p-6 md:p-8 bg-gray-50 rounded-xl shadow-2xl font-sans relative overflow-hidden">
      {/* Background gradients for visual flair */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-200 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10 relative z-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600">
          Mathematics Journey
        </span>
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 mb-8 shadow-lg relative z-10">
        <div className="mb-6 border-b pb-4 border-gray-200">
          <p className="text-xl font-semibold text-purple-800 mb-1">
            Step {currentStepIndex + 1} / {LESSON_CONTENT.length}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium text-purple-700">Purpose:</span> {currentStep.lesson_purpose}
          </p>
        </div>

        <div className="min-h-[350px] bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner flex items-center justify-center text-center transition-all duration-300 ease-in-out">
          {renderLessonContent(currentStep)}
        </div>

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

      <div className="text-center text-gray-500 text-sm mt-8 relative z-10">
        Navigate through the lesson steps using the 'Previous' and 'Next Step' buttons.
      </div>
    </div>
  );
};

export default MathematicsCourse;
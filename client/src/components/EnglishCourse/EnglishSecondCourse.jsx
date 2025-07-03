import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for the "Character Deconstruction" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Hook learners by highlighting the intrigue of fictional characters.",
    "scene_description": "A montage of famous literary characters (e.g., Sherlock Holmes, Hermione Granger, Atticus Finch) with question marks appearing around them.",
    "script": "Ever wondered what makes your favorite characters tick? Their secrets, their motivations, their journey? 🤔 Let's dive deep into the art of 'Character Deconstruction'!"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Understand the role and function of different character types (protagonist, antagonist, foil, etc.).",
    "content": "Characters are the heart of any story. We'll explore types like the **protagonist** (main character), **antagonist** (opposes the protagonist), **foil** (highlights another character's traits), and **confidante**. Each plays a vital role in shaping the narrative. 🎭"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Analyze character development through dialogue, actions, motivations, and relationships.",
    "scene_description": "An animated scene showing a character making a decision, then a dialogue bubble revealing their thoughts, demonstrating internal and external changes.",
    "script": "Characters aren't static; they evolve! Observe how a character's **dialogue** reveals their personality, and their **actions** show their growth or decline. It's like watching a person change right before your eyes! 🎬"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Evaluate the psychological, social, and symbolic dimensions of key characters.",
    "content": "Beyond their surface, characters often have **psychological** depths (their inner thoughts), **social** roles (how they fit into society), and **symbolic** meanings (what they represent). Analyzing these layers reveals the author's deeper intentions and the richness of the narrative. 🧠"
  },
  {
    "type": "text",
    "step_number": 5,
    "lesson_purpose": "Interpret character arcs and how they contribute to plot and theme development.",
    "content": "A **character arc** is the transformation or inner journey of a character over the course of a story. Understanding these arcs helps us see how characters grow (or regress) and how their changes directly contribute to the plot's progression and the development of the story's overall themes. 📈"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Provide an interactive exercise for identifying character traits and motivations.",
    "title": "Character Profiler",
    "description": "Read a short character description or dialogue. Identify key traits, potential motivations, and what type of character they might be. Submit your analysis to see feedback!",
    "working_code": `<html><head><style>body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }</style></head><body><h3>Character Profiler</h3><p style='font-style: italic; margin-bottom: 15px;'>\"Elara, though small in stature, carried herself with the unwavering posture of a queen. Her eyes, sharp and observant, missed nothing, and her quiet words often held more weight than a king's decree. She rarely smiled, but when she did, it was like the first ray of dawn after a long night.\"</p><textarea placeholder='Describe Elara (e.g., determined, mysterious, type: protagonist/foil)' style='padding:10px; margin-bottom:10px; width:90%; height:100px; border:1px solid #ccc; border-radius:5px;'></textarea><button style='padding:10px 20px; background-color:#d70081; color:white; border:none; border-radius:5px;'>Submit Analysis</button><p style='margin-top:15px;'>This is a placeholder for an interactive character analysis tool.</p></body></html>`,
    "explain": "Practice identifying character traits, motivations, and types from textual clues. This builds your analytical skills for deeper literary understanding!"
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Critically assess the reliability of narrators and their influence on character perception.",
    "scene_description": "Split screen: one side shows a scene from a story, the other side shows the same scene but distorted or filtered, representing an unreliable narrator's perspective. Animated text: 'Can you trust the storyteller?'",
    "script": "Not all narrators tell the whole truth! An **unreliable narrator** can significantly influence our perception of characters and events. They might be biased, naive, or even intentionally misleading. Learning to critically assess their reliability is key to a complete character deconstruction. 🕵️‍♀️"
  },
  {
    "type": "text",
    "step_number": 8,
    "lesson_purpose": "Compare character portrayals across different literary texts and authors.",
    "content": "Comparing characters across different works can reveal universal archetypes or unique authorial styles. How does a hero in a classic novel differ from a modern one? How do different authors portray similar character types? This comparative analysis deepens your understanding of literary craft. 📚"
  },
  {
    "type": "summary",
    "step_number": 9,
    "lesson_purpose": "Recap the importance of character analysis.",
    "content": "**Character deconstruction unveils the soul of a story!** 🕵️‍♀️ By analyzing types, development, motivations, relationships, and even narrator reliability, we gain profound insights into the narrative and the human experience. You're now a master character analyst! 📖"
  },
  {
    "type": "quiz",
    "step_number": 10,
    "lesson_purpose": "Check understanding of character types and analysis concepts.",
    "questions": [
      {
        "question": "Which character type is primarily defined by their opposition to the main character?",
        "options": [
          "Protagonist",
          "Foil",
          "Antagonist",
          "Confidante"
        ],
        "correct_answer": 2,
        "explanation": "The antagonist is the character who actively opposes the protagonist, creating conflict in the story."
      },
      {
        "question": "What does a character's 'arc' primarily refer to?",
        "options": [
          "Their physical appearance.",
          "The journey of their transformation or development throughout the story.",
          "The number of lines they speak.",
          "Their social status."
        ],
        "correct_answer": 1,
        "explanation": "A character arc describes the significant change or development a character undergoes from the beginning to the end of a story."
      },
      {
        "question": "If a narrator's perspective is biased or misleading, they are considered:",
        "options": [
          "An omniscient narrator",
          "A reliable narrator",
          "An unreliable narrator",
          "A third-person objective narrator"
        ],
        "correct_answer": 2,
        "explanation": "An unreliable narrator is one whose credibility has been compromised, often leading the reader to question their account of events or characters."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 11,
    "lesson_purpose": "Encourage applying character analysis to various media.",
    "content": "Your new character analysis skills aren't just for books! Apply them to movies, TV shows, and even real-life observations. Understanding characters helps you understand the world and the stories within it. Keep deconstructing! ✨"
  }
];

// Main component for the English Character Deconstruction Course
const EnglishCharacterDeconstructionCourse = () => {
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
          Character Deconstruction
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

export default EnglishCharacterDeconstructionCourse;

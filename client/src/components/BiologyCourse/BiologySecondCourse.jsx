import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for "Cells: The Basic Unit of Life" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce cells as the fundamental building blocks of all living things.",
    "scene_description": "Microscopic view zooming out from a single cell to a tissue, then an organ, then an organism. Animated text: 'All life is made of cells!'",
    "script": "Look closely! Everything alive, from the smallest bacteria to the largest whale, is made of these incredible tiny units: cells! They are the basic building blocks of life. Let's explore their amazing world! 🔬"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Introduce cell theory and its historical development.",
    "content": "The **Cell Theory** is a cornerstone of biology. It states that: 1) All living organisms are composed of one or more cells. 2) Cells are the basic unit of structure and organization in organisms. 3) All cells come from pre-existing cells. This theory developed over centuries of scientific discovery! 📜"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Compare and contrast prokaryotic and eukaryotic cells.",
    "scene_description": "Side-by-side animation of a simple prokaryotic cell (bacteria) and a more complex eukaryotic cell (animal/plant cell), highlighting key differences like nucleus presence.",
    "script": "Not all cells are the same! **Prokaryotic cells** are simple, like bacteria, without a nucleus. **Eukaryotic cells** are complex, found in plants, animals, fungi, and protists, and they have a true nucleus and other specialized parts. See the differences! 🦠➡️🌳"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Identify the structure and function of major cell organelles (e.g., nucleus, mitochondria, ribosomes).",
    "content": "Eukaryotic cells are packed with tiny organs called **organelles**, each with a specific job! The **nucleus** is the control center, housing DNA. **Mitochondria** are the powerhouses, generating energy. **Ribosomes** are protein factories. The **cell membrane** controls what enters and exits. There's so much happening inside! 🏭"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Understand the differences between plant and animal cells.",
    "content": "While both are eukaryotic, **plant and animal cells** have key differences. Plant cells have a rigid **cell wall** for support, a large central **vacuole** for storage, and **chloroplasts** for photosynthesis. Animal cells lack these, but have small vacuoles and centrioles for cell division. 🌿➡️🐾"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to identify organelles in an interactive cell diagram and compare cell types.",
    "title": "Cell Explorer & Comparer",
    "description": "Click on different parts of a cell diagram to reveal their names and functions. Switch between plant and animal cells to highlight their unique features.",
    "working_code": `<html>
<head>
<style>
  body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }
  .cell-container { width: 250px; height: 250px; background-color: #e0ffe0; border: 2px solid #66bb6a; border-radius: 10px; position: relative; overflow: hidden; margin-bottom: 20px; }
  .organelle { position: absolute; border-radius: 50%; cursor: pointer; transition: transform 0.2s; }
  .organelle:hover { transform: scale(1.1); }
  #info-box { margin-top: 15px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff; min-height: 50px; width: 90%; text-align: center; }
</style>
</head>
<body>
<h3>Cell Explorer</h3>
<p style='margin-bottom: 15px;'>Click on parts of the cell to learn more!</p>
<div class="cell-container" id="cellDiagram">
  <div class="organelle" style="top: 20px; left: 20px; width: 40px; height: 40px; background-color: #8e44ad;" data-name="Nucleus" data-function="Controls cell activities; contains genetic material."></div>
  <div class="organelle" style="bottom: 30px; right: 30px; width: 30px; height: 20px; background-color: #FFA500; border-radius: 5px;" data-name="Mitochondria" data-function="Powerhouse of the cell; produces energy (ATP)."></div>
  <div class="organelle" style="top: 70px; right: 20px; width: 25px; height: 25px; background-color: #d70081;" data-name="Chloroplast" data-function="Site of photosynthesis (plant cells only)."></div>
  <div class="organelle" style="top: 100px; left: 80px; width: 15px; height: 15px; background-color: #4CAF50; border-radius: 3px;" data-name="Ribosome" data-function="Synthesizes proteins."></div>
</div>
<div id="info-box">Click an organelle to see its function.</div>
<script>
  document.querySelectorAll('.organelle').forEach(organelle => {
    organelle.addEventListener('click', () => {
      const name = organelle.dataset.name;
      const func = organelle.dataset.function;
      document.getElementById('info-box').innerText = \`\${name}: \${func}\`;
    });
  });
</script>
</body>
</html>`,
    "explain": "Explore the intricate world inside a cell! Learn where each organelle is and what it does, and understand the unique features of different cell types."
  },
  {
    "type": "video",
    "step_number": 7,
    "lesson_purpose": "Explain the processes of cell membrane transport: diffusion, osmosis, and active transport.",
    "scene_description": "Animations showing molecules moving across a cell membrane: passive diffusion (high to low concentration), osmosis (water movement across a semi-permeable membrane), and active transport (using protein pumps, requiring energy).",
    "script": "How do cells get what they need and get rid of waste? Through their amazing cell membrane! Watch **diffusion** as molecules spread out, **osmosis** as water moves to balance concentrations, and **active transport** where cells use energy to pull things in or push them out. It's a busy gateway! 🚪"
  },
  {
    "type": "text",
    "step_number": 8,
    "lesson_purpose": "Describe how cells reproduce through mitosis and cytokinesis.",
    "content": "Cells reproduce to grow and repair tissues through a process called **mitosis**. This involves several phases where the cell's nucleus divides, creating two identical sets of chromosomes. Following mitosis, **cytokinesis** occurs, where the cell's cytoplasm divides, resulting in two separate, identical daughter cells. ➗"
  },
  {
    "type": "summary",
    "step_number": 9,
    "lesson_purpose": "Recap the fundamental concepts of cells.",
    "content": "**Cells are the fundamental units of life!** 🧬 They come in prokaryotic and eukaryotic forms, with specialized organelles, constantly transport materials across their membranes, and reproduce through mitosis. Understanding cells is understanding life itself! ✨"
  },
  {
    "type": "quiz",
    "step_number": 10,
    "lesson_purpose": "Check understanding of cell structures, functions, and processes.",
    "questions": [
      {
        "question": "Which organelle is responsible for generating most of the cell's energy (ATP)?",
        "options": [
          "Nucleus",
          "Ribosome",
          "Mitochondria",
          "Cell Wall"
        ],
        "correct_answer": 2,
        "explanation": "Mitochondria are often called the 'powerhouses of the cell' because they are the primary sites of ATP production through cellular respiration."
      },
      {
        "question": "Which of the following is a key difference between prokaryotic and eukaryotic cells?",
        "options": [
          "Eukaryotic cells have a cell wall, while prokaryotic cells do not.",
          "Prokaryotic cells have a true nucleus, while eukaryotic cells do not.",
          "Eukaryotic cells have membrane-bound organelles, while prokaryotic cells do not.",
          "Prokaryotic cells are generally larger than eukaryotic cells."
        ],
        "correct_answer": 2,
        "explanation": "The presence of a true nucleus and other membrane-bound organelles (like mitochondria, ER, Golgi) is a defining characteristic of eukaryotic cells, absent in prokaryotic cells."
      },
      {
        "question": "The process by which water moves across a semi-permeable membrane from an area of high water concentration to an area of low water concentration is called:",
        "options": [
          "Diffusion",
          "Active Transport",
          "Osmosis",
          "Facilitated Diffusion"
        ],
        "correct_answer": 2,
        "explanation": "Osmosis is the specific diffusion of water across a selectively permeable membrane."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 11,
    "lesson_purpose": "Encourage further exploration of cellular biology.",
    "content": "You've taken a fantastic journey into the microscopic world of cells! There's so much more to discover, from the specifics of DNA replication to specialized cell functions in different tissues. Keep exploring the basic unit of life! 🌟"
  }
];

// Main component for the Biology Cells Course
const BiologyCellsCourse = () => {
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
          Cells: The Basic Unit of Life
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

export default BiologyCellsCourse;

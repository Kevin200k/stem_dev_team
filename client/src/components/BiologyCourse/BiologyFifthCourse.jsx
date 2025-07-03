import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for "Ecosystems and Biodiversity" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Introduce ecosystems as interconnected communities of living and non-living things.",
    "scene_description": "A vibrant animation of a forest, showing animals, plants, sunlight, water, and soil interacting. Animated text: 'Everything is connected!'",
    "script": "Look at this forest! It's not just trees and animals; it's a bustling community where everything is connected. This is an **ecosystem** – a fascinating web of life and environment working together. Let's explore it! 🌳🦊💧"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Define ecosystems and describe their components: biotic and abiotic factors.",
    "content": "An **ecosystem** is a community of living organisms (**biotic factors**) interacting with their non-living environment (**abiotic factors**). Biotic factors include plants, animals, fungi, and bacteria. Abiotic factors are things like sunlight, water, soil, temperature, and air. Understanding both is key to understanding an ecosystem. ☀️🌱🦊💧"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Explain energy flow through food chains and food webs.",
    "scene_description": "Animation showing a simple food chain (e.g., grass → rabbit → fox) and then expanding to a more complex food web with multiple interconnected chains.",
    "script": "Energy flows through ecosystems! A **food chain** shows a single path of energy transfer (like grass to rabbit to fox). A **food web** is more realistic – it shows how multiple food chains are interconnected, creating a complex network of who eats whom. Follow the energy to see how life sustains itself! 🥕🐇🐺"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Describe the roles of producers, consumers, and decomposers.",
    "content": "Every organism has a specific role in an ecosystem! **Producers** (like plants and algae) make their own food through photosynthesis. **Consumers** obtain energy by eating other organisms (herbivores eat plants, carnivores eat meat, omnivores eat both). **Decomposers** (like bacteria and fungi) break down dead organic matter, recycling vital nutrients back into the ecosystem. ♻️"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Understand ecological relationships: competition, predation, symbiosis.",
    "content": "Organisms interact in diverse ways! **Competition** occurs when organisms vie for the same limited resources. **Predation** is a relationship where one organism (predator) hunts and kills another (prey). **Symbiosis** describes close, long-term interactions, which can be mutualistic (both benefit), commensalistic (one benefits, other neutral), or parasitic (one benefits, other harmed). Listen for examples of each! 🤝⚔️"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Allow learners to build a simple food web.",
    "title": "Food Web Builder Challenge",
    "description": "Drag and drop organisms to create a functional food web. Identify producers, primary consumers, secondary consumers, and decomposers. See if your web is stable!",
    "working_code": `<html>
<head>
<style>
  body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }
  .drop-zone { border: 2px dashed #ccc; width: 350px; height: 250px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; margin-bottom: 20px; background-color: #fff; border-radius: 10px; }
  .organism-button { padding: 10px 18px; margin: 5px; border-radius: 20px; border: none; cursor: grab; transition: background-color 0.2s, transform 0.1s; font-weight: bold; }
  .organism-button:active { cursor: grabbing; transform: scale(0.98); }
  .organism-button.producer { background-color: #66bb6a; color: white; } /* Green */
  .organism-button.consumer { background-color: #FFA500; color: white; } /* Orange */
  .organism-button.decomposer { background-color: #8e44ad; color: white; } /* Purple */
  .feedback-box { margin-top: 15px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff; min-height: 50px; width: 90%; text-align: center; }
</style>
</head>
<body>
<h3>Build a Food Web</h3>
<p style='margin-bottom: 15px;'>Drag organisms into the box to build a web!</p>
<div class="drop-zone" id="foodWebDropZone">
  Drop organisms here!
</div>
<div style='display:flex; flex-wrap:wrap; gap:10px; justify-content:center;'>
  <button class="organism-button producer" draggable="true" data-type="producer" data-name="Grass">Grass 🌱</button>
  <button class="organism-button consumer" draggable="true" data-type="consumer" data-name="Rabbit 🐇">Rabbit 🐇</button>
  <button class="organism-button consumer" draggable="true" data-type="consumer" data-name="Fox 🦊">Fox 🦊</button>
  <button class="organism-button consumer" draggable="true" data-type="consumer" data-name="Hawk 🦅">Hawk 🦅</button>
  <button class="organism-button consumer" draggable="true" data-type="consumer" data-name="Mouse 🐭">Mouse 🐭</button>
  <button class="organism-button decomposer" draggable="true" data-type="decomposer" data-name="Mushroom 🍄">Mushroom 🍄</button>
</div>
<div class="feedback-box" id="feedback">Build a chain: Producer -> Consumer!</div>

<script>
  const dropZone = document.getElementById('foodWebDropZone');
  const feedback = document.getElementById('feedback');
  let droppedOrganisms = [];

  document.querySelectorAll('.organism-button').forEach(button => {
    button.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ type: e.target.dataset.type, name: e.target.dataset.name }));
      e.dataTransfer.effectAllowed = 'copy';
    });
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const organism = { type: data.type, name: data.name };

    if (!droppedOrganisms.some(o => o.name === organism.name)) {
      droppedOrganisms.push(organism);
      const newButton = document.createElement('button');
      newButton.className = \`organism-button \${organism.type}\`;
      newButton.innerText = organism.name;
      newButton.style.cursor = 'default';
      dropZone.appendChild(newButton);
      updateFeedback();
    } else {
      feedback.innerText = \`\${organism.name} is already in the web!\`;
    }
  });

  function updateFeedback() {
    dropZone.innerHTML = ''; // Clear existing buttons
    droppedOrganisms.forEach(org => {
      const newButton = document.createElement('button');
      newButton.className = \`organism-button \${org.type}\`;
      newButton.innerText = org.name;
      newButton.style.cursor = 'default';
      dropZone.appendChild(newButton);
    });

    const producers = droppedOrganisms.filter(o => o.type === 'producer').length;
    const consumers = droppedOrganisms.filter(o => o.type === 'consumer').length;
    const decomposers = droppedOrganisms.filter(o => o.type === 'decomposer').length;

    if (producers > 0 && consumers > 0 && decomposers > 0) {
      feedback.innerText = 'Great! You have producers, consumers, and decomposers. Now try to imagine the connections!';
      feedback.style.color = 'green';
    } else if (producers > 0 && consumers > 0) {
      feedback.innerText = 'Good start! You have producers and consumers. Don\'t forget decomposers!';
      feedback.style.color = 'orange';
    } else {
      feedback.innerText = 'Start by adding producers (plants) and then consumers!';
      feedback.style.color = 'red';
    }
  }

  // Initial feedback
  updateFeedback();
</script>
<p style='margin-top:15px;'>This interactive tool helps you visualize relationships in a food web.</p>
</body>
</html>`,
    "explain": "Practice building food webs to understand energy flow and the interconnected roles within an ecosystem. See how different organisms depend on each other!"
  },
  {
    "type": "text",
    "step_number": 7,
    "lesson_purpose": "Explain the importance of biodiversity to ecosystem stability and human life.",
    "content": "**Biodiversity** is the variety of life on Earth at all levels, from genes to species to entire ecosystems. It's incredibly important because it makes ecosystems more stable and resilient to change, provides essential 'ecosystem services' like clean air and water, and offers resources for human well-being, including food, medicine, and cultural value. More diversity means a healthier planet! 🦋🌲🐟"
  },
  {
    "type": "video",
    "step_number": 8,
    "lesson_purpose": "Discuss threats to biodiversity and conservation efforts globally and locally.",
    "scene_description": "Animations/images showing deforestation, pollution (plastic in ocean), climate change impacts, and then visuals of conservation efforts (protected areas, species reintroduction).",
    "script": "Biodiversity faces many threats: habitat loss, pollution, climate change, overexploitation, and invasive species. But there's hope! Global and local **conservation efforts** like establishing protected areas, sustainable practices, and species recovery programs are crucial to protecting our planet's precious life. Let's learn how we can help! 🚨🌍"
  },
  {
    "type": "summary",
    "step_number": 9,
    "lesson_purpose": "Recap the interconnectedness of ecosystems and the value of biodiversity.",
    "content": "**Ecosystems are complex, interconnected systems!** 🕸️ They're built on biotic and abiotic factors, energy flow through food webs, and diverse relationships. Protecting **biodiversity** is key to maintaining healthy ecosystems and a healthy planet for all living things. Your understanding makes a difference! 💚"
  },
  {
    "type": "quiz",
    "step_number": 10,
    "lesson_purpose": "Check understanding of ecosystem components, energy flow, and biodiversity.",
    "questions": [
      {
        "question": "Which of the following is an example of a biotic factor in an ecosystem?",
        "options": [
          "Sunlight intensity",
          "Soil pH",
          "Bacteria",
          "Temperature"
        ],
        "correct_answer": 2,
        "explanation": "Biotic factors are living components of an ecosystem. Bacteria are living organisms, while the others are abiotic (non-living)."
      },
      {
        "question": "What is the primary role of a 'decomposer' in a food web?",
        "options": [
          "To produce their own food using sunlight.",
          "To consume other living organisms.",
          "To break down dead organic matter and return nutrients to the soil.",
          "To compete with other organisms for resources."
        ],
        "correct_answer": 2,
        "explanation": "Decomposers, such as bacteria and fungi, are essential for breaking down dead organic material and recycling nutrients, completing the energy cycle in an ecosystem."
      },
      {
        "question": "Why is high biodiversity generally considered beneficial for an ecosystem?",
        "options": [
          "It makes the ecosystem more susceptible to disease.",
          "It leads to a simpler food web, which is easier to manage.",
          "It increases the ecosystem's stability and resilience to disturbances.",
          "It reduces the need for energy flow within the ecosystem."
        ],
        "correct_answer": 2,
        "explanation": "Higher biodiversity provides more variety in species, roles, and genetic material, making an ecosystem more robust and able to recover from environmental changes or disturbances."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 11,
    "lesson_purpose": "Encourage action and awareness regarding biodiversity conservation.",
    "content": "You've gained a deeper understanding of ecosystems and the vital importance of biodiversity! Remember, every action counts, from supporting conservation efforts to making sustainable choices in your daily life. Be a guardian of biodiversity and help protect the incredible variety of life on our planet! 🌎🌱"
  }
];

// Main component for the Biology Ecosystems and Biodiversity Course
const BiologyEcosystemsBiodiversityCourse = () => {
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
          Ecosystems and Biodiversity
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

export default BiologyEcosystemsBiodiversityCourse;
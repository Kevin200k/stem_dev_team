import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The JSON data for "Genetics and Heredity" lesson
const LESSON_CONTENT = [
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Engage learners with the concept of inherited traits and family resemblances.",
    "scene_description": "A family photo album showing parents and children with shared features (e.g., eye color, hair color). Animated text: 'Like father, like son?'",
    "script": "Ever noticed how family members share traits? The same eye color, a similar nose, or even a quirky laugh? That's all thanks to something called Genetics and Heredity! Let's unravel the mystery of how traits are passed down. 👨‍👩‍👧‍👦"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Understand the basic principles of inheritance introduced by Gregor Mendel.",
    "content": "Our fundamental understanding of heredity began with **Gregor Mendel**, often called the 'father of genetics.' Through his meticulous pea plant experiments, he discovered basic principles like the Law of Segregation and the Law of Independent Assortment, explaining how traits are passed from parents to offspring. 🌱"
  },
  {
    "type": "video",
    "step_number": 3,
    "lesson_purpose": "Explain the function of DNA, genes, and chromosomes in heredity.",
    "scene_description": "Animation zooming from a cell nucleus to a chromosome, then unwinding to show the double helix structure of DNA, highlighting segments as genes.",
    "script": "At the heart of heredity is **DNA**, our genetic blueprint, a complex molecule carrying all our inherited information. Segments of DNA are called **genes**, which are instructions for specific traits. These genes are organized into compact structures called **chromosomes**. It's an incredible microscopic instruction manual for life! 🧬"
  },
  {
    "type": "text",
    "step_number": 4,
    "lesson_purpose": "Differentiate between dominant and recessive traits.",
    "content": "Traits can be **dominant** or **recessive**. A **dominant trait** (like brown eyes) will always be expressed if the corresponding gene is present. A **recessive trait** (like blue eyes) only appears if an individual inherits two copies of the recessive gene. It's like a genetic hierarchy where dominant traits take precedence! 💪"
  },
  {
    "type": "audio",
    "step_number": 5,
    "lesson_purpose": "Understand the basics of meiosis and its role in genetic variation.",
    "content": "**Meiosis** is a specialized type of cell division that produces gametes (sperm and egg cells) with half the number of chromosomes. This process is crucial because it shuffles and recombines genetic material, leading to the incredible **genetic variation** we observe among individuals within a species. It's why siblings are different! 🔄"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Interpret Punnett squares to predict genetic outcomes.",
    "title": "Punnett Square Predictor",
    "description": "Input parent genotypes for a simple Mendelian trait (e.g., 'Aa' for heterozygous) and see the predicted offspring genotypes and phenotypes. Experiment with dominant/recessive combinations to understand inheritance patterns!",
    "working_code": `<html>
<head>
<style>
  body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0; background-color: #f0f0f0; padding: 20px; box-sizing: border-box; }
  .input-group { margin-bottom: 15px; }
  label { margin-right: 10px; font-weight: bold; }
  input[type='text'] { padding: 8px; border: 1px solid #ccc; border-radius: 5px; width: 100px; text-align: center; }
  .punnett-grid { display: grid; grid-template-columns: repeat(3, 50px); grid-template-rows: repeat(3, 50px); border: 1px solid #333; margin-top: 20px; }
  .grid-cell { border: 1px solid #ccc; display: flex; justify-content: center; align-items: center; font-weight: bold; }
  .header-cell { background-color: #eee; }
  #result-phenotype { margin-top: 10px; font-weight: bold; }
</style>
</head>
<body>
<h3>Punnett Square</h3>
<div class="input-group">
  <label for="parent1">Parent 1 Genotype:</label>
  <input type="text" id="parent1" value="Aa" maxlength="2" onkeyup="updatePunnett()">
</div>
<div class="input-group">
  <label for="parent2">Parent 2 Genotype:</label>
  <input type="text" id="parent2" value="Aa" maxlength="2" onkeyup="updatePunnett()">
</div>

<div class="punnett-grid" id="punnettGrid">
  <div class="grid-cell header-cell"></div>
  <div class="grid-cell header-cell" id="p2a1"></div>
  <div class="grid-cell header-cell" id="p2a2"></div>
  <div class="grid-cell header-cell" id="p1a1"></div>
  <div class="grid-cell" id="c1"></div>
  <div class="grid-cell" id="c2"></div>
  <div class="grid-cell header-cell" id="p1a2"></div>
  <div class="grid-cell" id="c3"></div>
  <div class="grid-cell" id="c4"></div>
</div>
<p id="result-genotype" style="margin-top:20px; font-weight:bold;"></p>
<p id="result-phenotype"></p>

<script>
function updatePunnett() {
  const p1 = document.getElementById('parent1').value.toUpperCase();
  const p2 = document.getElementById('parent2').value.toUpperCase();

  if (p1.length !== 2 || p2.length !== 2) {
    document.getElementById('result-genotype').innerText = 'Enter 2 alleles per parent (e.g., Aa)';
    document.getElementById('result-phenotype').innerText = '';
    return;
  }

  const p1a1 = p1[0];
  const p1a2 = p1[1];
  const p2a1 = p2[0];
  const p2a2 = p2[1];

  document.getElementById('p1a1').innerText = p1a1;
  document.getElementById('p1a2').innerText = p1a2;
  document.getElementById('p2a1').innerText = p2a1;
  document.getElementById('p2a2').innerText = p2a2;

  const c1 = p1a1 + p2a1;
  const c2 = p1a1 + p2a2;
  const c3 = p1a2 + p2a1;
  const c4 = p1a2 + p2a2;

  document.getElementById('c1').innerText = c1;
  document.getElementById('c2').innerText = c2;
  document.getElementById('c3').innerText = c3;
  document.getElementById('c4').innerText = c4;

  const genotypes = [c1, c2, c3, c4].map(g => {
    // Sort alleles alphabetically for consistent representation (e.g., 'aA' becomes 'Aa')
    return g.split('').sort().join('');
  });

  const counts = {};
  genotypes.forEach(g => {
    counts[g] = (counts[g] || 0) + 1;
  });

  let genotypeText = 'Genotypes: ';
  for (const gen in counts) {
    genotypeText += \`\${gen} (\${counts[gen]/4 * 100}%), \`;
  }
  document.getElementById('result-genotype').innerText = genotypeText.slice(0, -2); // Remove trailing comma and space

  // Simple phenotype prediction (assuming standard dominant/recessive)
  const dominantAllele = p1a1 === p1a1.toUpperCase() ? p1a1 : p2a1; // Find the uppercase allele
  const recessiveAllele = p1a1 === p1a1.toLowerCase() ? p1a1 : p2a1; // Find the lowercase allele

  let dominantCount = 0;
  let recessiveCount = 0;

  genotypes.forEach(g => {
    if (g.includes(dominantAllele)) {
      dominantCount++;
    } else {
      recessiveCount++;
    }
  });

  // If there's no dominant allele present in the parents, then the "dominant" phenotype logic needs adjustment.
  // This simple logic assumes a clear dominant/recessive pair exists.
  if (!genotypes.some(g => g.includes(dominantAllele))) {
      dominantCount = 0; // No dominant phenotype if no dominant allele in offspring
      recessiveCount = 4; // All offspring are recessive phenotype
  }


  let phenotypeText = 'Phenotypes: ';
  if (dominantCount > 0) {
    phenotypeText += \`Dominant (\${dominantCount/4 * 100}%)\`;
  }
  if (recessiveCount > 0) {
    if (dominantCount > 0) phenotypeText += ', ';
    phenotypeText += \`Recessive (\${recessiveCount/4 * 100}%)\`;
  }
  document.getElementById('result-phenotype').innerText = phenotypeText;
}

// Initialize on load
updatePunnett();
</script>
<p style='margin-top:15px;'>This interactive tool helps you visualize genetic crosses.</p>
</body>
</html>`,
    "explain": "Practice predicting genetic outcomes using Punnett squares. It's like solving a genetic puzzle to understand how traits are inherited!"
  },
  {
    "type": "text",
    "step_number": 7,
    "lesson_purpose": "Explore real-world examples of inherited traits and genetic disorders.",
    "content": "Genetics isn't just theoretical; it impacts us directly! We'll explore common **inherited traits** like attached earlobes or widow's peak, and discuss the basics of some **genetic disorders** (e.g., sickle cell anemia, cystic fibrosis) to understand how gene mutations can affect human health. 🧬"
  },
  {
    "type": "summary",
    "step_number": 8,
    "lesson_purpose": "Recap the core concepts of genetics and heredity.",
    "content": "**Genetics explains why you are YOU!** 👨‍🔬 From Mendel's foundational laws to the intricate structure of DNA, and the processes of meiosis, we've seen how traits are passed down through generations, creating the incredible diversity of life on Earth. It's all in your genes! 🧬"
  },
  {
    "type": "quiz",
    "step_number": 9,
    "lesson_purpose": "Check understanding of genetic principles and terms.",
    "questions": [
      {
        "question": "Who is considered the 'father of genetics' for his pioneering work with pea plants?",
        "options": [
          "Charles Darwin",
          "Gregor Mendel",
          "Rosalind Franklin",
          "James Watson"
        ],
        "correct_answer": 1,
        "explanation": "Gregor Mendel's experiments with pea plants in the 19th century laid the foundational principles of heredity."
      },
      {
        "question": "If a dominant allele is represented by 'A' and a recessive allele by 'a', which genotype would express the recessive phenotype?",
        "options": [
          "AA",
          "Aa",
          "aa",
          "Both AA and Aa"
        ],
        "correct_answer": 2,
        "explanation": "The recessive phenotype is only expressed when an individual inherits two copies of the recessive allele (aa), as the dominant allele (A) would mask it."
      },
      {
        "question": "What is the primary purpose of meiosis?",
        "options": [
          "To repair damaged body cells.",
          "To produce identical daughter cells for growth.",
          "To produce genetically diverse gametes (sperm/egg cells).",
          "To synthesize proteins for cell function."
        ],
        "correct_answer": 2,
        "explanation": "Meiosis is a reduction division that creates haploid gametes, ensuring genetic variation in sexually reproducing organisms."
      }
    ]
  },
  {
    "type": "text",
    "step_number": 10,
    "lesson_purpose": "Encourage further exploration of genetics and its real-world implications.",
    "content": "You've unlocked the basics of genetics! This dynamic field is constantly evolving, with profound implications for medicine, agriculture, forensics, and understanding human ancestry. Keep exploring the fascinating world of DNA and inheritance; it's a journey into what makes us unique! 🌟"
  }
];

// Main component for the Biology Genetics and Heredity Course
const BiologyGeneticsHeredityCourse = () => {
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
          Genetics and Heredity
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

export default BiologyGeneticsHeredityCourse;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [courseContent, setCourseContent] = useState(null);
  const [parsedLesson, setParsedLesson] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = "2ls6Jv40FfVIOQfLZyasfzjsYbf1";
  const navigate = useNavigate();

  useEffect(() => {
    const generateContent = async () => {   
      try {
        const response = await fetch("http://localhost:5000/api/content/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            courseId,
            learningStyles: {
              Visual: 50,
              Kinesthetic: 30,
              Auditory: 20,
            },
          }),
        });

        if (!response.ok) throw new Error("Failed to generate content");
        const data = await response.json();

        let parsed = [];
        try {
          parsed = typeof data.generatedLesson === "string"
            ? JSON.parse(data.generatedLesson)
            : data.generatedLesson;
        } catch (e) {
          console.error("Failed to parse generated lesson:", e);
        }

        setCourseContent(data);
        setParsedLesson(parsed);
      } catch (err) {
        setError("Error generating course content");
        console.error("Generate content error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    generateContent();
  }, [courseId]);

  const handlePrevious = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  const handleNext = () => {
    if (currentStepIndex < parsedLesson.length - 1) setCurrentStepIndex(currentStepIndex + 1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderStep = (step) => {
    switch (step.type) {
      case "video":
        return (
          <div className="space-y-4">
            <p className="text-lg italic text-gray-700">"{step.script}"</p>
            <p className="text-gray-600">
              <span className="font-semibold">Scene:</span> {step.scene_description}
            </p>
            <div className="bg-gray-200 h-56 flex items-center justify-center rounded-lg shadow-inner">
              <p className="text-xl font-medium">[Video Placeholder]</p>
            </div>
          </div>
        );
      case "text":
        return <p className="text-lg text-gray-800">{step.content}</p>;
      case "audio":
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-800">{step.content}</p>
            <div className="bg-gray-200 h-32 flex items-center justify-center rounded-lg shadow-inner">
              <p className="text-xl font-medium">[Audio Placeholder]</p>
            </div>
          </div>
        );
      case "interaction":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-700">{step.title}</h3>
            <p className="text-gray-700 text-lg">{step.description}</p>
            <div className="border rounded-lg shadow-md overflow-hidden">
              <iframe
                srcDoc={step.working_code}
                title={step.title}
                className="w-full h-80"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
            <p className="text-sm text-gray-600 italic">{step.explain}</p>
          </div>
        );
      case "summary":
        return (
          <p className="text-xl font-bold bg-purple-50 p-6 rounded-md border border-purple-200 text-center">
            {step.content}
          </p>
        );
      case "quiz":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-purple-700">{step.lesson_purpose || "Quick Quiz!"}</h3>
            {step.questions.map((q, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border shadow-md">
                <p className="text-lg font-semibold mb-2">{i + 1}. {q.question}</p>
                {q.options.map((opt, j) => (
                  <label key={j} className="block text-lg cursor-pointer hover:text-purple-600">
                    <input type="radio" name={`question-${i}`} className="mr-2" />
                    {opt}
                  </label>
                ))}
              </div>
            ))}
          </div>
        );
      default:
        return <p className="text-red-600">Unknown content type: {step.type}</p>;
    }
  };

  if (loading) return <div className="p-6 text-lg">Loading content...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  if (!parsedLesson.length) return <div className="p-6">No content generated.</div>;

  const currentStep = parsedLesson[currentStepIndex];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-xl relative">
      {/* Gradient background or decoration */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-200 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <button
        onClick={handleGoBack}
        className="absolute top-6 left-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm shadow"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center mb-6 text-purple-800">
        Course Content
      </h1>

      <div className="bg-white p-6 rounded-xl border shadow-md space-y-6">
        <div>
          <p className="text-xl font-semibold text-purple-700">
            Step {currentStepIndex + 1} of {parsedLesson.length}
          </p>
          <p className="text-md text-gray-600">
            {currentStep.lesson_purpose || "Step Details"}
          </p>
        </div>

        <div className="min-h-[300px]">{renderStep(currentStep)}</div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === parsedLesson.length - 1}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded hover:from-purple-700 hover:to-pink-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

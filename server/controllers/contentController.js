const admin = require("firebase-admin");
const axios = require("axios");
const logger = require("../utils/logger"); // optional logging utility

// Replace with your actual AI server URL
const AI_SERVER_URL = "https://stem-dev-team.onrender.com/api/generate-lesson";

exports.generateContent = async (req, res) => {
  try {
    const { courseId, userId, learningStyles } = req.body;

    if (!courseId || !userId || !learningStyles) {
      return res.status(400).json({ error: "Missing courseId, userId, or learningStyles" });
    }

    // 🔍 1. Fetch the course
    const courseSnap = await admin.firestore().collection("courses").doc(courseId).get();

    if (!courseSnap.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseData = courseSnap.data();
    const schemeId = courseData.schemeOfWorkandObjectivesId;

    // 🧠 2. Fetch the corresponding scheme of work
    const schemeSnap = await admin
      .firestore()
      .collection("schemeOfWorkAndObjectives") // ✅ Correct collection name
      .doc(schemeId)
      .get();

    if (!schemeSnap.exists) {
      return res.status(404).json({
        error: "Scheme of Work not found",
        debug: { schemeId, courseId }
      });
    }

    const schemeData = schemeSnap.data();

    // 📦 3. Prepare payload for AI server
    const payload = {
      courseTitle: courseData.title,
      objectives: schemeData.objectives,
      subtopics: schemeData.subtopics,
      learning_styles: learningStyles
    };

    // 🤖 4. Call AI server
    const aiResponse = await axios.post(`${AI_SERVER_URL}/${courseId}`, payload);

    // 📤 5. Return AI response to frontend
    return res.status(200).json({
      courseTitle: courseData.title,
      courseId,
      generatedLesson: aiResponse.data.lesson
    });

  } catch (err) {
    console.error("❌ Error generating content:", err.message);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

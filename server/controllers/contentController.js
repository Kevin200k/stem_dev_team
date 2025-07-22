const admin = require("firebase-admin");
const axios = require("axios");
const logger = require("../utils/logger"); // Optional but useful

// 🔗 Your deployed Python AI server
const AI_SERVER_URL = "https://stem-dev-team.onrender.com/api/generate-lesson";

exports.generateContent = async (req, res) => {
  try {
    const { courseId, userId, learningStyles } = req.body;

    if (!courseId || !userId || !learningStyles) {
      return res.status(400).json({ error: "Missing courseId, userId, or learningStyles" });
    }

    // 1. Fetch the course document
    const courseSnap = await admin.firestore().collection("courses").doc(courseId).get();

    if (!courseSnap.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseData = courseSnap.data();
    const schemeId = courseData.schemeOfWorkandObjectivesId;

    // 2. Fetch the scheme of work
    const schemeSnap = await admin
      .firestore()
      .collection("schemeOfWorkAndObjectives")
      .doc(schemeId)
      .get();

    if (!schemeSnap.exists) {
      return res.status(404).json({
        error: "Scheme of Work not found",
        debug: { schemeId, courseId }
      });
    }

    const schemeData = schemeSnap.data();

    // 3. Prepare payload for Python server
    const payload = {
      user_id: userId,
      course_title: courseData.title,
      objectives: schemeData.objectives,
      subtopics: schemeData.subtopics,
      learning_styles: learningStyles
    };

    // 4. Make request to Python AI server
    const aiResponse = await axios.post(AI_SERVER_URL, payload);

    const generatedLesson = aiResponse.data.lesson;

    // 5. Optional: Save generated lesson under the user in Firestore
    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("generatedLessons")
      .add({
        courseId,
        title: courseData.title,
        generatedLesson,
        createdAt: new Date().toISOString()
      });

    // 6. Respond to frontend
    return res.status(200).json({
      courseTitle: courseData.title,
      courseId,
      generatedLesson
    });

  } catch (err) {
    logger.error("❌ Error generating content:", err.message);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message
    });
  }
};

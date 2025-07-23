const admin = require("firebase-admin");
const axios = require("axios");
const logger = require("../utils/logger");

const AI_SERVER_URL = "https://stem-dev-team.onrender.com/api/generate-lesson";

exports.generateContent = async (req, res) => {
  try {
    const { courseId, userId, learningStyles } = req.body;

    if (!courseId || !userId || !learningStyles) {
      return res.status(400).json({ error: "Missing courseId, userId, or learningStyles" });
    }

    const db = admin.firestore();

    // 🔍 1. Check if lesson already exists for this user and course
    const existingQuery = await db
      .collection("generatedLessons")
      .where("courseId", "==", courseId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (!existingQuery.empty) {
      const doc = existingQuery.docs[0];
      return res.status(200).json({
        courseId,
        courseTitle: doc.data().courseTitle,
        generatedLesson: doc.data().generatedContent,
        fromCache: true,
        lessonId: doc.id
      });
    }

    // 2. Fetch course
    const courseSnap = await db.collection("courses").doc(courseId).get();
    if (!courseSnap.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseData = courseSnap.data();
    const schemeId = courseData.schemeOfWorkandObjectivesId;

    // 3. Fetch scheme
    const schemeSnap = await db.collection("schemeOfWorkAndObjectives").doc(schemeId).get();
    if (!schemeSnap.exists) {
      return res.status(404).json({
        error: "Scheme of Work not found",
        debug: { schemeId, courseId }
      });
    }

    const schemeData = schemeSnap.data();

    // 4. Prepare payload for Python AI server
    const payload = {
      user_id: userId,
      course_title: courseData.title,
      objectives: schemeData.objectives,
      subtopics: schemeData.subtopics,
      learning_styles: learningStyles
    };

    // 5. Make request to Python AI server
    const aiResponse = await axios.post(AI_SERVER_URL, payload);
    const generatedLesson = aiResponse.data.lesson;

    // 6. Save to generatedLessons collection
    const lessonRef = await db.collection("generatedLessons").add({
      userId,
      courseId,
      courseTitle: courseData.title,
      generatedContent: generatedLesson,
      createdAt: new Date().toISOString(),
      status: "generated",
      audioUrls: [],
      videoUrls: [],
      imageUrls: []
    });

    // 7. Link to user’s generatedLessons (reference only)
    await db
      .collection("users")
      .doc(userId)
      .collection("generatedLessons")
      .doc(lessonRef.id)
      .set({
        lessonId: lessonRef.id,
        courseId,
        createdAt: new Date().toISOString()
      });

    // 8. Respond
    return res.status(200).json({
      courseId,
      courseTitle: courseData.title,
      generatedLesson,
      lessonId: lessonRef.id,
      fromCache: false
    });

  } catch (err) {
    logger.error("❌ Error generating content:", err.message);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message
    });
  }
};

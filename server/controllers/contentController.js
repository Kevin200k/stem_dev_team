const axios = require("axios");
const admin = require("firebase-admin");

exports.generateFullCourseContent = async (req, res) => {
  const { userId, courseId, learningStyles } = req.body;

  // 🛑 Validation
  if (!userId || !courseId || typeof learningStyles !== "object") {
    return res.status(400).json({ error: "Missing or invalid fields: userId, courseId, or learningStyles" });
  }

  try {
    const db = admin.firestore();

    // 🔍 Step 1: Fetch the course document
    const courseRef = db.collection("courses").doc(courseId);
    const courseSnap = await courseRef.get();

    if (!courseSnap.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseData = courseSnap.data();
    const schemeId = courseData.schemeOfWorkandObjectivesId;

    if (!schemeId) {
      return res.status(400).json({ error: "Course is missing a schemeOfWorkandObjectivesId" });
    }

    console.log("✅ Found Course:", courseData.title || "Untitled");
    console.log("🔗 Scheme ID:", schemeId);

    // 🔍 Step 2: Fetch the Scheme of Work & Objectives
    const schemeRef = db.collection("schemeOfWorkandObjectives").doc(schemeId);
    const schemeSnap = await schemeRef.get();

    if (!schemeSnap.exists) {
      return res.status(404).json({
        error: "Scheme of Work not found",
        debug: { schemeId, courseId }
      });
    }

    const schemeData = schemeSnap.data();
    const { subtopics = [], objectives = [] } = schemeData;

    if (subtopics.length === 0 && objectives.length === 0) {
      return res.status(400).json({ error: "Scheme of Work is empty" });
    }

    // 📡 Step 3: Send to AI server
    const response = await axios.post(
      `${process.env.AI_SERVER_URL}/api/generate-lesson/${courseId}`,
      {
        subtopics,
        objectives,
        learning_styles: learningStyles
      }
    );

    const aiLesson = response.data.lesson;

    // 💾 Step 4: Save generated content to Firestore
    await db
      .collection("users")
      .doc(userId)
      .collection("courseContent")
      .doc(courseId)
      .set({
        userId,
        courseId,
        content: aiLesson,
        learningStyles,
        generatedAt: new Date().toISOString()
      });

    return res.status(201).json({
      message: "Lesson generated successfully",
      lesson: aiLesson
    });

  } catch (err) {
    console.error("❌ Error generating lesson:", err.message);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

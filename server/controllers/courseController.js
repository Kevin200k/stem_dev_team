const admin = require('firebase-admin');
const logger = require("../utils/logger");

exports.getAllCourses = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('courses').get();
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    logger.info(`Fetched ${courses.length} courses`);
    res.json(courses);
  } catch (err) {
    logger.error(`Failed to fetch courses: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.saveExistingCourseForUser = async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ error: "Missing userId or courseId" });
  }

  try {
    const db = admin.firestore();

    // Check if the course already exists in user's saved courses
    const userCourseRef = db
      .collection("users")
      .doc(userId)
      .collection("courses")
      .doc(courseId);

    const existingCourseSnap = await userCourseRef.get();
    if (existingCourseSnap.exists) {
      return res.status(200).json({
        message: "Course already saved for this user",
        course: existingCourseSnap.data()
      });
    }

    // Fetch the course from global courses collection
    const courseRef = db.collection("courses").doc(courseId);
    const courseSnap = await courseRef.get();

    if (!courseSnap.exists) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseData = courseSnap.data();
    const now = new Date().toISOString();

    const userCourse = {
      courseId,
      title: courseData.title,
      addedAt: now,
      started: false,
      completed: false,
      progress: 0,
      lastAccessed: now
    };

    await userCourseRef.set(userCourse);

    res.status(201).json({
      message: "Course saved to user",
      course: userCourse
    });

  } catch (err) {
    logger.error(`Error saving course for user: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

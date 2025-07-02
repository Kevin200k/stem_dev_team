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

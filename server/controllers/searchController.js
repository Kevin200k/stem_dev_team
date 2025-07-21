const admin = require('firebase-admin');
const logger = require("../utils/logger");

exports.searchCoursesOnly = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const db = admin.firestore();

    // 📁 Fetch all categories to resolve categoryId -> category name
    const categoriesSnapshot = await db.collection('categories').get();
    const categoryMap = {};
    categoriesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      categoryMap[doc.id] = data.name || 'Unknown';
    });

    // 📘 Search Courses
    const coursesSnapshot = await db.collection('courses').get();
    const matchedCourses = coursesSnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          type: 'course',
          categoryName: categoryMap[data.categoryId] || 'Unknown',
        };
      })
      .filter(course =>
        course.title?.toLowerCase().includes(query.toLowerCase()) ||
        course.description?.toLowerCase().includes(query.toLowerCase())
      );

    logger.info(`Search for "${query}" returned ${matchedCourses.length} course(s)`);
    res.json(matchedCourses);
  } catch (err) {
    logger.error(`Course search failed: ${err.message}`);
    res.status(500).json({ error: "Course search failed" });
  }
};

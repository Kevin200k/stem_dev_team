const express = require('express');
const router = express.Router();
const { getAllCourses } = require('../controllers/courseController');
const { saveExistingCourseForUser } = require("../controllers/courseController");

// router.post("/courses", addCourse);
router.get('/', getAllCourses);
router.post("/save", saveExistingCourseForUser);

module.exports = router;

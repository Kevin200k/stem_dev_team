const express = require('express');
const router = express.Router();
const { searchCoursesOnly } = require('../controllers/searchController');

router.get('/', searchCoursesOnly); // GET /api/search?query=algebra

module.exports = router;

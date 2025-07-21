const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

// POST /api/content/generate
router.post("/generate", contentController.generateContent);

module.exports = router;

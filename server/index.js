require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Firebase admin from firebaseConfig.js
const { admin } = require("./firebaseConfig");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Main Routes
app.get("/", (req, res) => res.send("🔥 STEM Learn API is running"));

// 🔐 Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 📚 Course Routes
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

// 📤 Upload Routes
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/uploads", uploadRoutes);

// 🔍 Search Route ✅ NEW
const searchRoutes = require("./routes/searchRoutes");
app.use("/api/search", searchRoutes);

// 👤 User Routes (dashboard, profile, etc.)
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

// 🏆 Leaderboard / Progress / Streaks
const leaderboardRoutes = require("./routes/leaderboardRoutes");
app.use("/api/leaderboard", leaderboardRoutes);

const contentRoutes = require("./routes/contentRoutes");
app.use("/api/content", contentRoutes);

// 🚀 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

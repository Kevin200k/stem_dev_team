require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

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

// 👤 User Routes (dashboard, profile, etc.)
// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes);

// 🏆 Leaderboard / Progress / Streaks
const leaderboardRoutes = require("./routes/leaderboardRoutes");
app.use("/api/leaderboard", leaderboardRoutes);

// 🚀 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

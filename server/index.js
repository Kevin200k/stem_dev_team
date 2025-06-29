require("dotenv").config(); // Load .env variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory store – for production, use Firestore or Redis
const verificationCodes = {};

app.use(cors());
app.use(bodyParser.json());

// 📨 Send verification code to email
app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = { code, expires: Date.now() + 5 * 60 * 1000 }; // 5 min

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("🧪 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("🧪 EMAIL_PASS exists?", !!process.env.EMAIL_PASS);
    await transporter.sendMail({
      "from": `STEM Learn AI" <${process.env.EMAIL_USER}>`,
      "to": email,
      "subject": "Your Verification Code",
      "html": `<p>Your code is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
    });

    res.json({ message: "Code sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify the submitted code
app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const data = verificationCodes[email];

  if (!data) return res.status(400).json({ error: "No code requested" });
  if (Date.now() > data.expires) {
    delete verificationCodes[email];
    return res.status(400).json({ error: "Code expired" });
  }

  if (data.code !== code) {
    return res.status(400).json({ error: "Invalid code" });
  }

  delete verificationCodes[email];
  res.json({ message: "Verified" });
});

// 🔐 Signup with Firebase
app.post("/signup", async (req, res) => {
  const { email, password, username, learningStyle } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password, displayName: username });
    await admin.firestore().collection('users').doc(user.uid).set({
      username,
      learningStyle,
      email,
      progress: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      provider: 'email',
      verified: true,
    });
    res.json({ message: "Signup complete", uid: user.uid });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔑 Login endpoint
app.post("/login", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    res.json({ message: "Login successful", uid: decoded.uid });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// 🔄 Reset password email
app.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    // Optionally, send link via email
    res.json({ message: "Password reset email sent", link });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
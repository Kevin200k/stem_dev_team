const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

const verificationCodes = {};

exports.sendCode = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = { code, expires: Date.now() + 5 * 60 * 1000 };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `STEM Learn AI <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `<p>Your code is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
    });

    logger.info(`Verification code sent to ${email}`);
    res.json({ message: "Code sent" });
  } catch (err) {
    logger.error(`Error sending code to ${email}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyCode = (req, res) => {
  const { email, code } = req.body;
  const data = verificationCodes[email];

  if (!data) {
    logger.warn(`Verification attempt without request for ${email}`);
    return res.status(400).json({ error: "No code requested" });
  }

  if (Date.now() > data.expires) {
    logger.warn(`Code expired for ${email}`);
    delete verificationCodes[email];
    return res.status(400).json({ error: "Code expired" });
  }

  if (data.code !== code) {
    logger.warn(`Invalid code attempt for ${email}`);
    return res.status(400).json({ error: "Invalid code" });
  }

  delete verificationCodes[email];
  logger.info(`Code verified successfully for ${email}`);
  res.json({ message: "Verified" });
};

exports.signup = async (req, res) => {
  const { email, password, username, learningStyle } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password, displayName: username });
    await admin.firestore().collection("users").doc(user.uid).set({
      username,
      email,
      learningStyle: learningStyle || "",
      progress: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      provider: "email",
      verified: false,
    });

    logger.info(`New user signed up: ${email} (${username})`);
    res.json({ message: "Signed Up Successfully", uid: user.uid });
  } catch (err) {
    logger.error(`Signup failed for ${email}: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    logger.info(`User logged in: ${decoded.uid}`);
    res.json({ message: "Login successful", uid: decoded.uid });
  } catch (err) {
    logger.warn(`Invalid login attempt: ${err.message}`);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const link = await admin.auth().generatePasswordResetLink(email);
    logger.info(`Password reset link sent to ${email}`);
    res.json({ message: "Password reset email sent", link });
  } catch (err) {
    logger.error(`Failed to send reset link to ${email}: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

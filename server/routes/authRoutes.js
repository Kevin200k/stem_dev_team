const express = require("express");
const router = express.Router();
const {
  sendCode,
  verifyCode,
  signup,
  login,
  resetPassword,
} = require("../controllers/authController");

router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);

module.exports = router;
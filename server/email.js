// email.js
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load .env variables

const sendVerificationEmail = async (toEmail, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"STEM App" <${process.env.EMAIL_ADDRESS}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: `<h2>Your verification code is: <strong>${code}</strong></h2>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Detailed Email Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack,
    });
    throw error;
  }
};

module.exports = sendVerificationEmail;

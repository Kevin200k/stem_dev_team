const admin = require("firebase-admin");

let serviceAccount;

if (process.env.NODE_ENV === "production") {
  // In production (e.g., Vercel, Heroku), load from environment variable
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error("❌ FIREBASE_SERVICE_ACCOUNT is missing in production!");
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT environment variable");
  }

  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    console.error("❌ Invalid FIREBASE_SERVICE_ACCOUNT JSON in production");
    throw err;
  }
} else {
  // In development, use local serviceAccountKey.json
  try {
    serviceAccount = require("./serviceAccountKey.json");
  } catch (err) {
    console.error("❌ Missing or invalid serviceAccountKey.json in development");
    throw err;
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };

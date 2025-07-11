const admin = require("firebase-admin");

let serviceAccount;

// Check if running in Render with env variable
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("FIREBASE_SERVICE_ACCOUNT env var is not valid JSON.");
    throw error;
  }
} else {
  // Fallback for local dev if you have the file
  serviceAccount = require("./serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };

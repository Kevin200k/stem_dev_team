const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json"))
});

const db = admin.firestore();
const data = require("./firebase_seed_backend.json");

async function seedDatabase() {
  for (const category of data.categories) {
    await db.collection("categories").doc(category.id).set(category);
  }

  for (const obj of data.objectives) {
    await db.collection("objectives").doc(obj.id).set(obj);
  }

  for (const scheme of data.schemesOfWork) {
    await db.collection("schemesOfWork").doc(scheme.id).set(scheme);
  }

  for (const course of data.courses) {
    await db.collection("courses").doc(course.id).set(course);
  }

  console.log("🔥 Seed complete!");
}

seedDatabase().catch(console.error);

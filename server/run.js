const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const categories = [
  "History",
  "Mathematics",
  "Biology",
  "Physics",
  "English",
  "Chemistry",
];

const generateCourses = (categoryId, subject) => {
  const topics = {
    History: ["World Wars", "Ancient Civilizations", "Colonialism", "Revolutions", "African History", "Modern Conflicts"],
    Mathematics: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Linear Equations"],
    Biology: ["Cell Biology", "Genetics", "Evolution", "Human Anatomy", "Ecology", "Microbiology"],
    Physics: ["Motion", "Thermodynamics", "Electromagnetism", "Waves", "Quantum Mechanics", "Relativity"],
    English: ["Essay Writing", "Grammar", "Literature", "Reading Comprehension", "Debate Skills", "Creative Writing"],
    Chemistry: ["Atomic Structure", "Chemical Reactions", "Organic Chemistry", "Periodic Table", "Acids and Bases", "Thermochemistry"]
  };

  return topics[subject].map((topic, index) => {
    const courseId = uuidv4();
    const schemeId = uuidv4();
    return {
      course: {
        id: courseId,
        title: topic,
        description: `Comprehensive course on ${topic.toLowerCase()} under ${subject}.`,
        categoryId: categoryId,
        schemeOfWorkandObjectivesId: schemeId,
      },
      scheme: {
        id: schemeId,
        courseId: courseId,
        subtopics: [
          `${topic} - Introduction`,
          `${topic} - Intermediate Concepts`,
          `${topic} - Applications`,
          `${topic} - Practice and Evaluation`,
        ],
        objectives: [
          `Understand the basics of ${topic.toLowerCase()}`,
          `Apply ${topic.toLowerCase()} in real-world scenarios`,
          `Analyze problems related to ${topic.toLowerCase()}`,
        ],
      },
    };
  });
};

(async () => {
  try {
    for (const subject of categories) {
      const categoryId = uuidv4();
      const createdAt = new Date().toISOString();

      const categoryRef = db.collection("categories").doc(categoryId);
      await categoryRef.set({
        id: categoryId,
        name: subject,
        createdAt,
      });

      const coursesWithSchemes = generateCourses(categoryId, subject);

      for (const { course, scheme } of coursesWithSchemes) {
        await db.collection("courses").doc(course.id).set(course);
        await db.collection("schemeOfWorkAndObjectives").doc(scheme.id).set(scheme);
      }

      console.log(`✅ Seeded ${subject} with 6 courses.`);
    }

    console.log("🎉 All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
})();

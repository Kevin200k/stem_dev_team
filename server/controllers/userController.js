const admin = require("firebase-admin");
const logger = require("../utils/logger");

exports.updateUserAgeGroup = async (req, res) => {
  try {
    const { userId, ageGroup } = req.body;

    // Validate input
    if (!userId || !ageGroup) {
      return res.status(400).json({ error: "Missing userId or ageGroup" });
    }

    const db = admin.firestore();

    // Update the user's age group
    await db.collection("users").doc(userId).set(
      {
        ageGroup: ageGroup
      },
      { merge: true } // Prevents overwriting other fields
    );

    return res.status(200).json({
      message: "Age group updated successfully",
      userId,
      ageGroup
    });
  } catch (error) {
    logger.error("❌ Error updating age group:", error.message);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};

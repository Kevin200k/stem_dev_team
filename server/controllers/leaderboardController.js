const admin = require('firebase-admin');
const logger = require("../utils/logger");

exports.getLeaderboard = async (req, res) => {
  try {
    const snapshot = await admin.firestore()
      .collection('users')
      .orderBy('progress.score', 'desc')
      .limit(10)
      .get();

    const leaderboard = snapshot.docs.map(doc => ({
      uid: doc.id,
      username: doc.data().username,
      score: doc.data().progress?.score || 0,
      streak: doc.data().progress?.streak || 0,
    }));

    logger.info("Leaderboard fetched");
    res.json(leaderboard);
  } catch (err) {
    logger.error(`Failed to fetch leaderboard: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

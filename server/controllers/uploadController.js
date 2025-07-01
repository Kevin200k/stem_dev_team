const logger = require("../utils/logger");

exports.handleUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      logger.warn("Upload attempted without file");
      return res.status(400).json({ error: 'No file uploaded' });
    }

    logger.info(`File uploaded: ${file.originalname}`);
    res.json({ message: 'Upload successful', filename: file.originalname });
  } catch (err) {
    logger.error(`Upload failed: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const express = require('express');
const multer = require('multer');
const { handleUpload } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // change to cloud storage if needed

router.post('/', upload.single('file'), handleUpload);

module.exports = router;

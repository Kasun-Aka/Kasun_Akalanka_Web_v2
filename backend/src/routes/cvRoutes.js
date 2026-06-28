const express = require('express');
const router = express.Router();
const path = require('path');
const verifyFirebaseToken = require('../middleware/auth');
const CvDownload = require('../models/CvDownload');

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    // Log the download event
    await CvDownload.create({
      email: req.user.email || "unknown",
      name: req.user.name || req.user.email || "Unknown",
    });

    const cvPath = path.join(__dirname, '../../assets/K-CV.pdf');
    return res.download(cvPath);
  } catch (error) {
    console.error("Error downloading CV:", error.message);
    return res.status(500).json({ message: 'Failed to download CV' });
  }
});

module.exports = router;

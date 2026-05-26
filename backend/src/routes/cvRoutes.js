const express = require('express');
const router = express.Router();
const path = require('path');
const verifyFirebaseToken = require('../middleware/auth');

router.get('/', verifyFirebaseToken, (req, res) => {
  // Simple logic, no need for a separate service file for just downloading a static asset
  try {
    const cvPath = path.join(__dirname, '../../assets/K-CV.pdf');
    return res.download(cvPath);
  } catch (error) {
    console.error("Error downloading CV:", error.message);
    return res.status(500).json({ message: 'Failed to download CV' });
  }
});

module.exports = router;

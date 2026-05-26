const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/auth");
const authService = require("../services/authService");

router.post("/google", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await authService.googleLogin(req.user);
    res.status(200).json({ message: "Authenticated successfully", user });
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(500).json({ error: "Server error during authentication" });
  }
});

module.exports = router;

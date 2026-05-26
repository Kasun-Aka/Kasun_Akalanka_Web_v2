const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/auth");
const userService = require("../services/userService");

router.get("/me", verifyFirebaseToken, async (req, res) => {
  try {
    const userProfile = await userService.getCurrentUser(req.user.uid);
    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error fetching user" });
  }
});

module.exports = router;

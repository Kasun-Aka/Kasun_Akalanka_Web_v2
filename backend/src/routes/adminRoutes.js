const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const adminService = require("../services/adminService");

// Protect all routes in this file with both auth and admin check
router.use(verifyFirebaseToken);
router.use(adminOnly);

router.get("/users", async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Admin error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await adminService.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Admin error fetching messages:", error.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;

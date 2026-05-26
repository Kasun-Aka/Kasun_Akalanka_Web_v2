const express = require("express");
const router = express.Router();
const messageService = require("../services/messageService");
// If we want only logged-in users to send messages, add verifyFirebaseToken middleware here
// For now, keeping it open/public based on typical contact forms

router.post("/messages", async (req, res) => {
  try {
    const message = await messageService.saveMessage(req.body);
    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (error) {
    console.error("Error saving message:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;

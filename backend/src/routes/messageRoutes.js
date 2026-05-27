const express = require("express");
const router = express.Router();
const messageService = require("../services/messageService");
const rateLimit = require("express-rate-limit");

// Strict rate limiter: 2 messages per day per IP
const messageLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 2, // limit each IP to 2 requests per windowMs
  message: { error: "You can only send 2 messages per day. Please try again tomorrow." }
});

router.post("/messages", messageLimiter, async (req, res) => {
  try {
    const message = await messageService.saveMessage(req.body);
    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (error) {
    console.error("Error saving message:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;

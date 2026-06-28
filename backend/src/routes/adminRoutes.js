const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyFirebaseToken = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const adminService = require("../services/adminService");

// Configure multer for CV file upload (memory storage, 10MB limit, PDF only)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

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

// GET /api/admin/cv-downloads — View download count and list of downloaders
router.get("/cv-downloads", async (req, res) => {
  try {
    const stats = await adminService.getCvDownloadStats();
    res.json(stats);
  } catch (error) {
    console.error("Admin error fetching CV download stats:", error.message);
    res.status(500).json({ error: "Failed to fetch CV download stats" });
  }
});

// PUT /api/admin/cv-file — Replace the K-CV.pdf file
router.put("/cv-file", upload.single("cv"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Use field name 'cv'." });
    }

    const result = await adminService.replaceCvFile(req.file.buffer);
    res.json(result);
  } catch (error) {
    // Handle multer-specific errors
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size exceeds 10 MB limit" });
      }
      return res.status(400).json({ error: error.message });
    }
    console.error("Admin error replacing CV file:", error.message);
    res.status(500).json({ error: error.message || "Failed to replace CV file" });
  }
});

module.exports = router;


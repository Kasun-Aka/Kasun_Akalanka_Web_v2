const mongoose = require("mongoose");

const CvDownloadSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, default: "Unknown" },
  downloadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CvDownload", CvDownloadSchema);

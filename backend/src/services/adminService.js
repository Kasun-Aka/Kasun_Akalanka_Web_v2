const User = require("../models/User");
const Message = require("../models/Message");
const CvDownload = require("../models/CvDownload");
const fs = require("fs");
const path = require("path");

const getAllUsers = async () => {
  try {
    // Exclude uid and sensitive fields if necessary, sorting by newest
    const users = await User.find({}, "-uid").sort({ createdAt: -1 });
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

const getAllMessages = async () => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return messages;
  } catch (error) {
    throw new Error("Failed to fetch messages");
  }
};

const getCvDownloadStats = async () => {
  try {
    const totalDownloads = await CvDownload.countDocuments();
    const downloads = await CvDownload.find({}, "email name downloadedAt")
      .sort({ downloadedAt: -1 });
    return { totalDownloads, downloads };
  } catch (error) {
    throw new Error("Failed to fetch CV download stats");
  }
};

const replaceCvFile = async (fileBuffer) => {
  try {
    const cvPath = path.join(__dirname, "../../assets/K-CV.pdf");

    // Delete existing file if it exists
    if (fs.existsSync(cvPath)) {
      fs.unlinkSync(cvPath);
    }

    // Write new file
    fs.writeFileSync(cvPath, fileBuffer);
    return { message: "CV file replaced successfully" };
  } catch (error) {
    throw new Error("Failed to replace CV file");
  }
};

module.exports = {
  getAllUsers,
  getAllMessages,
  getCvDownloadStats,
  replaceCvFile,
};


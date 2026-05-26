const User = require("../models/User");

const adminOnly = async (req, res, next) => {
  try {
    // req.user is set by the auth middleware
    const uid = req.user.uid;
    const user = await User.findOne({ uid });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin role required." });
    }

    // Attach full user object from DB if needed downstream
    req.dbUser = user;
    next();
  } catch (error) {
    console.error("Admin check failed:", error.message);
    return res.status(500).json({ error: "Server error during authorization" });
  }
};

module.exports = adminOnly;

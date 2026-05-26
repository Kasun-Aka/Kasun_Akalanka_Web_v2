const User = require("../models/User");

const getCurrentUser = async (uid) => {
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      throw new Error("User not found");
    }
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    throw new Error("Failed to fetch user profile");
  }
};

module.exports = {
  getCurrentUser,
};

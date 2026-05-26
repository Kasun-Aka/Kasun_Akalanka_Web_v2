const User = require("../models/User");

const googleLogin = async (decodedToken) => {
  const { uid, name, email } = decodedToken;

  try {
    // Check if user already exists
    let user = await User.findOne({ uid });

    if (!user) {
      // First time signing in, create user
      user = new User({
        uid,
        name: name || "Google User", // Fallback if name is empty
        email,
      });
      await user.save();
    }

    return user;
  } catch (error) {
    throw new Error("Failed to authenticate user in database");
  }
};

module.exports = {
  googleLogin,
};

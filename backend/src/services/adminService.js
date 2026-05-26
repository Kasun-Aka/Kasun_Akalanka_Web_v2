const User = require("../models/User");
const Message = require("../models/Message");

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

module.exports = {
  getAllUsers,
  getAllMessages,
};

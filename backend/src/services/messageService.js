const Message = require("../models/Message");

const saveMessage = async (messageData) => {
  try {
    const newMessage = new Message(messageData);
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error("Failed to save message to database");
  }
};

module.exports = {
  saveMessage,
};

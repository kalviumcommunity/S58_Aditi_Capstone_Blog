const Notification = require("../models/Notification");

const createNotification = async ({
  recipient,
  sender,
  type,
  article,
  text,
}) => {
  try {
    // don't notify yourself about your own action
    if (recipient.toString() === sender.toString()) return;

    await Notification.create({ recipient, sender, type, article, text });
  } catch (err) {
    // a failed notification must never break the underlying action
    console.error("Failed to create notification:", err.message);
  }
};

module.exports = createNotification;

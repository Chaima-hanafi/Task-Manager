import notifications from "../models/notificationModel.js";


// Receive an event
export const receiveNotification = (req, res) => {
  const { event, data } = req.body;

  const notif = {
    id: Date.now(),
    event,
    data,
    read: false,
    createdAt: new Date()
  };
  
  notifications.push(notif);
  console.log("📩 New notification received:", notif);

  res.status(201).json({ message: "Notification received", notif });
};

// Get all notifications

export const getNotifications = (req, res) => {
  res.json(notifications);
};

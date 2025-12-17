import fs from "fs/promises";
import path from "path";

// Path du fichier JSON
const filePath = path.resolve("data/notifications.json");

// Lire les notifications depuis le fichier
async function loadNotifications() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Si le fichier n'existe pas → retourne un tableau vide
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// Sauvegarder les notifications dans le fichier
async function saveNotifications(notifications) {
  await fs.writeFile(filePath, JSON.stringify(notifications, null, 2));
}

// ---------------------------
// Receive a notification
// ---------------------------
export const receiveNotification = async (req, res) => {
  const { event, data } = req.body;

  const notif = {
    id: Date.now(),
    event,
    data,
    read: false,
    createdAt: new Date(),
  };

  try {
    let notifications = await loadNotifications();   // Charger depuis json
    notifications.push(notif);                       // Ajouter la notif
    await saveNotifications(notifications);          // Sauvegarder dans json

    console.log("📩 New notification received:", notif);
    res.status(201).json({ message: "Notification received", notif });

  } catch (err) {
    console.error("❌ Error saving notification:", err);
    res.status(500).json({ error: "Error saving notification" });
  }
};

// ---------------------------
// Get notifications
// ---------------------------
export const getNotifications = async (req, res) => {
  try {
    const notifications = await loadNotifications();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Error reading notifications" });
  }
};

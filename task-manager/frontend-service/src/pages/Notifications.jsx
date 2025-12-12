import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    getNotifications().then(setNotifs);
  }, []);

  return (
    <div>
      <h2>Notifications</h2>

      <ul>
        {notifs.map((n) => (
          <li key={n.id}>
            <b>{n.event}</b> — {n.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

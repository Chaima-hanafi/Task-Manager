const API = import.meta.env.VITE_NOTIFICATION_API;

export async function getNotifications() {
  const res = await fetch(`${API}/notify`);
  return res.json();
}

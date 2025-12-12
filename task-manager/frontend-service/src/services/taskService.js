const API = import.meta.env.VITE_TASK_API;

export async function getTasks() {
  const res = await fetch(`${API}/tasks`);
  return res.json();
}

export async function addTask(task) {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  return res.json();
}

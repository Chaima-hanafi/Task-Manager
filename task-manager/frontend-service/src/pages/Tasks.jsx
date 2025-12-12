import { useEffect, useState } from "react";
import { getTasks, addTask } from "../services/taskService";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function handleAdd() {
    const newTask = await addTask({ title });
    setTasks([...tasks, newTask]);
    setTitle("");
  }

  return (
    <div>
      <h2>Tasks</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

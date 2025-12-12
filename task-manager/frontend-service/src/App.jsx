import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav style={{ padding: 20, background: "#f2f2f2" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/tasks">Tasks</Link> |{" "}
        <Link to="/notifications">Notifications</Link>
      </nav>

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}

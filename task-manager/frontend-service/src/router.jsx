import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Notifications from "./pages/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/notifications", element: <Notifications /> },
    ]
  }
]);

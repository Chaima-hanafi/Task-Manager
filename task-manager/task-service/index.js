import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 4001;
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});

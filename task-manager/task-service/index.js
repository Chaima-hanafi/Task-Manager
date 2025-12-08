import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});

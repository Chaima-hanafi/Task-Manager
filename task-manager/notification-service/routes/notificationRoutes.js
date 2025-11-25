import { Router } from "express";
import {
  receiveNotification,
  getNotifications
} from "../controllers/notificationController.js";

const router = Router();

router.post("/", receiveNotification);   // POST /notify
router.get("/", getNotifications);       // GET /notify

export default router;

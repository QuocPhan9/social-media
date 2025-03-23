import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import { deleteNotification, deleteNotifications, getNotifications } from '../controllers/notificationController.js';


const router = express.Router();
//get notification
router.get("/",  userAuth, getNotifications)
//delete notifications
router.delete("/", userAuth, deleteNotifications)
//delete notification
router.delete("/:id", userAuth, deleteNotification)

export default router;
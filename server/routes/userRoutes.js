import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getUserProfileController, updateUserProfileController, getAllUsersController, deleteUserController } from "../controllers/userController.js";
import userModel from "../models/userModel.js"; // Import userModel for notification routes

const router = express.Router();

// Get User Profile
router.get('/profile', requireSignIn, getUserProfileController);

// Update User Profile
router.put('/profile', requireSignIn, updateUserProfileController);

// Get All Users
router.get('/users', requireSignIn, getAllUsersController);

// Delete User
router.delete('/users/:userId', requireSignIn, deleteUserController);

// Fetch Notifications for Logged-In User || GET
router.get("/notifications", requireSignIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("notifications");
    res.status(200).send({
      success: true,
      notifications: user.notifications,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching notifications",
      error,
    });
  }
});

// Mark Notifications as Read || PUT
router.put("/notifications/mark-as-read", requireSignIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Mark all notifications as read
    user.notifications.forEach((notification) => (notification.read = true));
    await user.save();

    res.status(200).send({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error marking notifications as read",
      error,
    });
  }
});

export default router;

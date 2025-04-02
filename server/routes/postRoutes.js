import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createPostController,
  getUserPostsController,
  getPostController,
  singlePostController,
  postPhotoController,
  deletePostController,
  updatePostController,
  addBidController,
  acceptBidController,
  rejectBidController,
  holdBidController,
  completePostController,
  addRatingController,
  addLikeController,
  addCommentController,
  getAllPosts,
  getPostPhoto,
  getClusteredPostsController,
  editPostController,
} from "../controllers/postController.js";
import Formidable from "express-formidable";
import userModel from "../models/userModel.js"; // Import userModel for notification routes

const router = express.Router();

// Routes

// Create Post || POST
router.post("/create", requireSignIn, Formidable(), createPostController);

// Get All Posts || GET
router.get("/get-posts", getPostController);

// Get User Posts || GET
router.get("/user", requireSignIn, getUserPostsController);

// Single Post || GET
router.get("/single-post/:slug", singlePostController);

// Get Photo || GET
router.get("/post-photo/:pid", postPhotoController);

// Delete Post || DELETE
router.delete("/delete-post/:pid", requireSignIn, deletePostController);

// Update Post || PUT
router.put("/update-post/:pid", requireSignIn, updatePostController);

// Edit Post || PUT
router.put("/edit-post/:pid", requireSignIn, editPostController);

// Add Bid to Post || POST
router.post("/add-bid", requireSignIn, addBidController);

// Accept Bid || POST
router.post("/accept-bid", requireSignIn, acceptBidController);

// Reject Bid || POST
router.post("/reject-bid", requireSignIn, rejectBidController);

// Hold Bid || POST
router.post("/hold-bid", requireSignIn, holdBidController);

// Complete Post || POST
router.post("/complete-post", requireSignIn, completePostController);

// Add Comment to Post || POST
router.post("/add-comment", requireSignIn, addCommentController);

// Add Rating to Post || POST
router.post("/add-rating", requireSignIn, addRatingController);

// Add Like to Post || POST
router.post("/add-like", requireSignIn, addLikeController);

// Get All Posts || GET
router.get("/", getAllPosts);

// Get Post Photo || GET
router.get("/photo/:postId", getPostPhoto);

// Fetch Clustered Posts || GET
router.get("/clustered-posts", requireSignIn, getClusteredPostsController);

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
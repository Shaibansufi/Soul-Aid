import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getUserProfileController, updateUserProfileController, getAllUsersController, deleteUserController } from "../controllers/userController.js";

const router = express.Router();

// Get User Profile
router.get('/profile', requireSignIn, getUserProfileController);

// Update User Profile
router.put('/profile', requireSignIn, updateUserProfileController);

// Get All Users
router.get('/users', requireSignIn, getAllUsersController);

// Delete User
router.delete('/users/:userId', requireSignIn, deleteUserController);

export default router;

import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createPostController, getPostController, postPhotoController, singlePostController, deletePostController, updatePostController, getUserPostsController } from "../controllers/postController.js";
import Formidable from "express-formidable";
const router = express.Router();

// Routes

// Create Post || Post 
router.post(
    '/create',
    requireSignIn,
    createPostController
);

// Get All Posts || Get
router.get('/get-posts', getPostController);

// Get User Posts
router.get('/user', requireSignIn, getUserPostsController);

export default router;

// Single Post || Get 
router.get('/single-post/:slug', singlePostController);

// Get Photo
router.get('/post-photo/:pid', postPhotoController);

// Delete Post 
router.delete('/delete-post/:pid', deletePostController);

// Update Post || Put
router.put(
    '/update-post/:pid',
    requireSignIn,
    Formidable(),
    updatePostController
);
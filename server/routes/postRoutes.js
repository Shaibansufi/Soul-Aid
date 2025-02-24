import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createPostController, getPostController, postPhotoController, singlePostController, deletePostController, updatePostController, getUserPostsController, addBidController, addRatingController, addLikeController, addCommentController } from "../controllers/postController.js";
import Formidable from "express-formidable";
const router = express.Router();

// Routes

// Create Post || Post 
router.post(
    '/create',
    requireSignIn,
    Formidable(),
    createPostController
);

// Get All Posts || Get
router.get('/get-posts', getPostController);

// Get User Posts
router.get('/user', requireSignIn, getUserPostsController);

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

// Add Bid to Post
router.post('/add-bid', requireSignIn, addBidController);

// Add Rating to Post
router.post('/add-rating', requireSignIn, addRatingController);

// Add Like to Post
router.post('/add-like', requireSignIn, addLikeController);

// Add Comment to Post
router.post('/add-comment', requireSignIn, addCommentController);

export default router;
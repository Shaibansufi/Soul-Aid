import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createPostController, getPostController, postPhotoController, singlePostController,deletePostController,updatePostController } from "../controllers/postController.js";
import Formidable from "express-formidable";
const router = express.Router()


// Routes

// Create Post || Post 
router.post(
    '/create-post',
    requireSignIn,
    Formidable(),
    createPostController
);


// Get All Posts || Get
router.get('/get-posts',getPostController)
export default router;


// Single Post || GEt 
router.get('/single-post/:slug',singlePostController)


// Get Photo
router.get('/post-photo/:pid',postPhotoController)


// Delete Post 
router.delete('/delete-post/:pid',deletePostController)


// Update Post || Put
router.put(
    '/update-post/:pid',
    requireSignIn,
    Formidable(),
    updatePostController
);
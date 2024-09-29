import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createStreamController, deleteStreamController, getStreamController, singleStreamController, updateStreamController } from "../controllers/streamController.js";


const router = express.Router()

// routes


// create stream || Post
router.post(
    '/create-stream'
    ,requireSignIn,
    isAdmin,
    createStreamController
);


// update stream || Put

router.put('/update-stream/:id',
    requireSignIn,
    isAdmin,
    updateStreamController
)

// get All Stream || Get

router.get('/get-stream',getStreamController)
export default router

// Single Stream || Get
router.get('/single-stream/:slug',singleStreamController)

// Delete Stream || Delete
router.delete(
    '/delete-stream/:id',
    requireSignIn,
    isAdmin,
    deleteStreamController,
)
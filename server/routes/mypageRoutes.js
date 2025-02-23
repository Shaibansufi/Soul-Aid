import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getUserProjectsController, getUserSessionsController, getResourcesController } from "../controllers/mypageController.js";

const router = express.Router();

// Get User Projects
router.get('/projects', requireSignIn, getUserProjectsController);

// Get User Sessions
router.get('/sessions', requireSignIn, getUserSessionsController);

// Get Resources
router.get('/resources', getResourcesController);

export default router;

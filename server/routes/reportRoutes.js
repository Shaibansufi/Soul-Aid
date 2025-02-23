import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createReportController, getUserReportsController, getAllReportsController, updateReportStatusController } from "../controllers/reportController.js";

const router = express.Router();

// Create Report
router.post('/create', requireSignIn, createReportController);

// Get User Reports
router.get('/user', requireSignIn, getUserReportsController);

// Get All Reports
router.get('/all', requireSignIn, getAllReportsController);

// Update Report Status
router.put('/update/:reportId', requireSignIn, updateReportStatusController);

export default router;

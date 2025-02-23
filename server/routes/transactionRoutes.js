import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createTransactionController, getUserTransactionsController, getAllTransactionsController, updateTransactionStatusController } from "../controllers/transactionController.js";

const router = express.Router();

// Create Transaction
router.post('/create', requireSignIn, createTransactionController);

// Get User Transactions
router.get('/user', requireSignIn, getUserTransactionsController);

// Get All Transactions
router.get('/all', requireSignIn, getAllTransactionsController);

// Update Transaction Status
router.put('/update/:transactionId', requireSignIn, updateTransactionStatusController);

export default router;

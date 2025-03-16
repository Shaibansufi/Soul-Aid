import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createTransaction,
  getUserTransactions,
  getAllTransactionsController,
  updateTransactionStatusController,
} from '../controllers/transactionController.js';

const router = express.Router();

// Create Transaction
router.post('/create', requireSignIn, createTransaction);

// Get User Transactions
router.get('/user', requireSignIn, getUserTransactions);

// Get All Transactions
router.get('/', getAllTransactionsController);

// Update Transaction Status
router.put('/update-status/:transactionId', requireSignIn, updateTransactionStatusController);

export default router;
import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import Transaction from '../models/transactionModel.js'; // Import Transaction model
import {
  createTransaction,
  getAllTransactionsController,
  updateTransactionStatusController,
} from '../controllers/transactionController.js';

const router = express.Router();

// Create Transaction
router.post('/create', requireSignIn, async (req, res) => {
  try {
    const transaction = await createTransaction(req, res);
    console.log('Transaction created:', transaction);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Creating Transaction',
      error,
    });
  }
});

// Get User Transactions
router.get('/user', requireSignIn, async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store'); // Disable caching for this endpoint
    const transactions = await Transaction.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
    })
      .populate('fromUser', 'name')
      .populate('toUser', 'name')
      .populate('post', 'title');
    console.log('Fetched transactions:', transactions); // Debugging
    res.status(200).send({
      success: true,
      message: 'User Transactions Fetched Successfully',
      transactions,
    });
  } catch (error) {
    console.error('Error in fetching user transactions:', error);
    res.status(500).send({
      success: false,
      message: 'Error in Fetching User Transactions',
      error,
    });
  }
});

// Get All Transactions
router.get('/', getAllTransactionsController);

// Update Transaction Status
router.put('/update-status/:transactionId', requireSignIn, updateTransactionStatusController);

export default router;
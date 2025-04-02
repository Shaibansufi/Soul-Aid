import Transaction from '../models/transactionModel.js';

// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { fromUser, toUser, post, amount } = req.body;
    const transaction = new Transaction({
      fromUser,
      toUser,
      post,
      amount,
    });
    await transaction.save();
    res.status(201).send({
      success: true,
      message: 'Transaction Created Successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Creating Transaction',
      error,
    });
  }
};

// Get User Transactions (Updated)
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { fromUser: req.user._id },  // User sent money
        { toUser: req.user._id }      // User received money
      ]
    })
    .populate('fromUser', 'name')
    .populate('toUser', 'name')
    .populate('post', 'title')
    .sort({ createdAt: -1 });  // Newest first

    res.status(200).send({
      success: true,
      message: 'User Transactions Fetched Successfully',
      transactions,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Fetching User Transactions',
      error,
    });
  }
};

// Get All Transactions
export const getAllTransactionsController = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('fromUser', 'name')
      .populate('toUser', 'name')
      .populate('post', 'title');
    res.status(200).send({
      success: true,
      message: 'All Transactions Fetched Successfully',
      transactions,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Fetching All Transactions',
      error,
    });
  }
};

// Update Transaction Status
export const updateTransactionStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.transactionId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Transaction Status Updated Successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Updating Transaction Status',
      error,
    });
  }
};
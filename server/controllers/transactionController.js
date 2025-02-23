import transactionModel from "../models/transactionModel.js";

// Create Transaction || Post
export const createTransactionController = async (req, res) => {
    try {
        const { fromUser, toUser, post, amount } = req.body;
        const transaction = new transactionModel({ fromUser, toUser, post, amount });
        await transaction.save();
        res.status(201).send({
            success: true,
            message: 'Transaction Created Successfully',
            transaction
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Creating Transaction',
            error
        });
    }
};

// Get User Transactions || Get
export const getUserTransactionsController = async (req, res) => {
    try {
        const transactions = await transactionModel.find({ fromUser: req.user._id }).populate('fromUser toUser post');
        res.status(200).send({
            success: true,
            message: 'User Transactions Fetched Successfully',
            transactions
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching User Transactions',
            error
        });
    }
};

// Get All Transactions || Get
export const getAllTransactionsController = async (req, res) => {
    try {
        const transactions = await transactionModel.find({}).populate('fromUser toUser post');
        res.status(200).send({
            success: true,
            message: 'All Transactions Fetched Successfully',
            transactions
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching All Transactions',
            error
        });
    }
};

// Update Transaction Status || Put
export const updateTransactionStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        const transaction = await transactionModel.findByIdAndUpdate(req.params.transactionId, { status }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Transaction Status Updated Successfully',
            transaction
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Updating Transaction Status',
            error
        });
    }
};

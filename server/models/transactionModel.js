import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    toUser: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    post: {
        type: mongoose.ObjectId,
        ref: "posts",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('transactions', transactionSchema);

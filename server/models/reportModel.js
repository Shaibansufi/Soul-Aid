import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    reportedBy: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    reportedUser: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "reviewed", "resolved"],
        default: "pending"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('reports', reportSchema);
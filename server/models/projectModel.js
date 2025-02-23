import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "pending"],
        default: "active"
    }
}, { timestamps: true });

export default mongoose.model('projects', projectSchema);

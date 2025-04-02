import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    misuseFlag: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [String],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default to false for regular users
    },
    notifications: [
      {
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
    ],
    interests: {
      type: [String],
      default: [], // Default to an empty array
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
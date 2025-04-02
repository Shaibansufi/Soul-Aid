import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  expectedMoney: {
    type: Number,
    required: true,
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  status: {
    type: String,
    enum: ['open', 'active', 'closed'], // Ensure only valid enum values are allowed
    default: 'open', // Default to 'open' for new posts
    required: true, // Ensure the status field is always set
  },
  acceptedBid: {
    user: {
      type: mongoose.ObjectId,
      ref: 'users',
    },
    amount: {
      type: Number,
    },
    timeSlot: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  bids: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'users',
      },
      amount: {
        type: Number,
        required: true,
      },
      timeSlot: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'on hold'],
        default: 'pending',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'users',
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  likes: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.ObjectId,
        ref: 'users',
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  photo: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });

export default mongoose.model('posts', postSchema);
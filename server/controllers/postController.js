import postModel from '../models/postModel.js';
import fs from 'fs';
import Transaction from '../models/transactionModel.js';
import userModel from '../models/userModel.js'; // Import user model
import kmeans from 'node-kmeans'; // Install this library using `npm install node-kmeans`

// Create Post
export const createPostController = async (req, res) => {
  try {
    const { title, content, category, skills, location, availability, experience, contact, expectedMoney, visibility } =
      req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (
      !title ||
      !content ||
      !category ||
      !skills ||
      !location ||
      !availability ||
      !experience ||
      !contact ||
      !expectedMoney ||
      !visibility
    ) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required',
      });
    }

    // Create new post
    const post = new postModel({
      user: req.user._id,
      title,
      content,
      category,
      skills: skills.split(',').map((skill) => skill.trim()),
      location,
      availability,
      experience,
      contact,
      expectedMoney,
      visibility,
    });

    // Handle photo upload
    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.contentType = photo.type;
    }

    await post.save();
    res.status(201).send({
      success: true,
      message: 'Post Created Successfully',
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Creating Post',
      error,
    });
  }
};

// Get User Posts
export const getUserPostsController = async (req, res) => {
  try {
    const posts = await postModel.find({ user: req.user._id });
    res.status(200).send({
      success: true,
      message: 'User Posts Fetched Successfully',
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Fetching User Posts',
      error,
    });
  }
};

// Get All Posts
export const getPostController = async (req, res) => {
  try {
    const posts = await postModel.find({}).populate('user', 'name');
    res.status(200).send({
      success: true,
      message: 'All Posts Fetched Successfully',
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Fetching Posts',
      error,
    });
  }
};

// Get Single Post
export const singlePostController = async (req, res) => {
  try {
    const post = await postModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: 'Single Post Fetched Successfully',
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Fetching Single Post',
      error,
    });
  }
};

// Get Post Photo
export const postPhotoController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.pid).select('photo');
    if (post.photo.data) {
      res.set('Content-type', post.photo.contentType);
      return res.send(post.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Fetching Post Photo',
      error,
    });
  }
};

// Delete Post
export const deletePostController = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: 'Post Deleted Successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Deleting Post',
      error,
    });
  }
};

// Update Post
export const updatePostController = async (req, res) => {
  try {
    const { status } = req.body;

    // Find the post
    const post = await postModel.findById(req.params.pid).populate('acceptedBid.user', 'name email');
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found.',
      });
    }

    // Update the post status
    post.status = status;

    // If the status is updated to 'closed', create a transaction
    if (status === 'closed') {
      if (!post.acceptedBid || !post.acceptedBid.user || !post.acceptedBid.amount) {
        return res.status(400).send({
          success: false,
          message: 'No accepted bid found for this post.',
        });
      }

      // Check if a transaction already exists for this post
      const existingTransaction = await Transaction.findOne({ post: post._id });
      if (!existingTransaction) {
        // Create a new transaction
        const transaction = new Transaction({
          fromUser: post.user, // Post owner
          toUser: post.acceptedBid.user._id, // Bidder
          post: post._id,
          amount: post.acceptedBid.amount,
        });
        await transaction.save();
        console.log('Transaction created:', transaction); // Debugging
      }
    }

    await post.save();

    res.status(200).send({
      success: true,
      message: 'Post status updated successfully.',
      post,
    });
  } catch (error) {
    console.error('Error in updating post status:', error);
    res.status(500).send({
      success: false,
      message: 'Error in updating post status.',
      error,
    });
  }
};

// Add Bid to Post
export const addBidController = async (req, res) => {
  try {
    const { postId, amount, timeSlot, message } = req.body;

    // Find the post
    const post = await postModel.findById(postId); // Use postModel instead of Post
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if the user is the post owner
    if (post.user.toString() === req.user._id.toString()) {
      return res.status(400).send({
        success: false,
        message: 'You cannot bid on your own post',
      });
    }

    // Add the bid to the bids array
    post.bids.push({
      user: req.user._id, // The user who is placing the bid
      amount,
      timeSlot,
      message,
    });

    // Save the updated post
    await post.save();

    res.status(200).send({
      success: true,
      message: 'Bid added successfully',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in adding bid',
      error,
    });
  }
};

// Accept Bid
export const acceptBidController = async (req, res) => {
  try {
    const { postId, bidId } = req.body;

    // Validate input
    if (!postId || !bidId) {
      return res.status(400).send({
        success: false,
        message: 'Post ID and Bid ID are required.',
      });
    }

    // Find the post
    const post = await postModel.findById(postId).populate('bids.user', 'name email');
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found.',
      });
    }

    // Check if the user is the post owner
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: 'Only the post owner can accept bids.',
      });
    }

    // Check if a bid has already been accepted
    if (post.acceptedBid && post.acceptedBid._id) {
      return res.status(400).send({
        success: false,
        message: 'A bid has already been accepted for this post.',
      });
    }

    // Find the bid
    const bid = post.bids.id(bidId);
    if (!bid) {
      return res.status(404).send({
        success: false,
        message: 'Bid not found.',
      });
    }

    // Update the bid status to 'accepted'
    bid.status = 'accepted';
    post.acceptedBid = bid; // Set the accepted bid in the post
    post.status = 'active'; // Set the project status to 'active'
    await post.save();

    // Add a notification to the bidder
    const bidder = await userModel.findById(bid.user);
    if (bidder) {
      bidder.notifications.push({
        message: `Your bid of $${bid.amount} on the post "${post.title}" has been accepted by the post owner.`,
        read: false,
      });
      await bidder.save();
    }

    res.status(200).send({
      success: true,
      message: 'Bid accepted successfully, and project status updated to active.',
      post,
    });
  } catch (error) {
    console.error('Error in accepting bid:', error);
    res.status(500).send({
      success: false,
      message: 'Error in accepting bid.',
      error: error.message,
    });
  }
};

// Reject Bid
export const rejectBidController = async (req, res) => {
  try {
    const { postId, bidId } = req.body;

    // Find the post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found',
      });
    }

    // Find the bid
    const bid = post.bids.id(bidId);
    if (!bid) {
      return res.status(404).send({
        success: false,
        message: 'Bid not found',
      });
    }

    // Update the bid status to 'rejected'
    bid.status = 'rejected';
    await post.save();

    // Add a notification to the bidder
    const bidder = await userModel.findById(bid.user);
    if (bidder) {
      bidder.notifications.push({
        message: 'Your bid has been rejected.',
        read: false,
      });
      await bidder.save();
    }

    res.status(200).send({
      success: true,
      message: 'Bid rejected successfully.',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in rejecting bid',
      error,
    });
  }
};

// Hold Bid
export const holdBidController = async (req, res) => {
  try {
    const { postId, bidId } = req.body;

    // Find the post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found',
      });
    }

    // Find the bid
    const bid = post.bids.id(bidId);
    if (!bid) {
      return res.status(404).send({
        success: false,
        message: 'Bid not found',
      });
    }

    // Update the bid status to 'on hold'
    bid.status = 'on hold';
    await post.save();

    // Add a notification to the bidder
    const bidder = await userModel.findById(bid.user);
    if (bidder) {
      bidder.notifications.push({
        message: 'Your bid has been put on hold.',
        read: false,
      });
      await bidder.save();
    }

    res.status(200).send({
      success: true,
      message: 'Bid put on hold successfully.',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in holding bid',
      error,
    });
  }
};

// Complete Post
export const completePostController = async (req, res) => {
  try {
    const { postId } = req.body;

    // Find the post
    const post = await postModel.findById(postId).populate('acceptedBid.user', 'name email');
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found.',
      });
    }

    // Ensure the post has an accepted bid
    if (!post.acceptedBid || !post.acceptedBid.user || !post.acceptedBid.amount) {
      return res.status(400).send({
        success: false,
        message: 'No accepted bid found for this post.',
      });
    }

    // Update post status to 'closed'
    post.status = 'closed';
    await post.save();

    // Create a new transaction for both the post owner and the bidder
    const transaction = new Transaction({
      fromUser: post.user, // Post owner
      toUser: post.acceptedBid.user._id, // Bidder
      post: post._id,
      amount: post.acceptedBid.amount,
    });
    await transaction.save();

    res.status(200).send({
      success: true,
      message: 'Post completed and transaction created successfully.',
      post,
      transaction,
    });
  } catch (error) {
    console.error('Error in completing post:', error);
    res.status(500).send({
      success: false,
      message: 'Error in completing post.',
      error: error.message,
    });
  }
};

// Add Rating to Post

export const addRatingController = async (req, res) => {
  try {
    const { postId, rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).send({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    // Find the post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if the user is the post owner
    if (post.user.toString() === req.user._id.toString()) {
      return res.status(400).send({
        success: false,
        message: 'You cannot rate your own post',
      });
    }

    // Add the rating to the ratings array
    post.ratings.push({
      user: req.user._id,
      rating,
    });

    // Save the updated post
    await post.save();

    res.status(200).send({
      success: true,
      message: 'Rating added successfully',
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in adding rating',
      error,
    });
  }
};

// Add Like to Post
export const addLikeController = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found',
      });
    }
    post.likes.push({
      user: req.user._id,
    });
    await post.save();
    res.status(200).send({
      success: true,
      message: 'Like added successfully',
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in adding like',
      error,
    });
  }
};

// Add Comment to Post
export const addCommentController = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found',
      });
    }
    post.comments.push({
      user: req.user._id,
      comment,
    });
    await post.save();
    res.status(200).send({
      success: true,
      message: 'Comment added successfully',
      post,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in adding comment',
      error,
    });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts and populate the 'user' field with 'name' and other necessary fields
    const posts = await postModel
      .find({})
      .populate('user', 'name email') // Add more fields if needed
      .populate('bids.user', 'name') // Populate bidder details if needed
      .populate('comments.user', 'name'); // Populate commenter details if needed

    // If no posts are found, return a 404 response
    if (!posts || posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No posts found',
      });
    }

    // Convert binary photo data to base64 for each post
    const postsWithBase64Photos = posts.map((post) => {
      if (post.photo && post.photo.data) {
        const base64Photo = Buffer.from(post.photo.data).toString('base64');
        return {
          ...post.toObject(), // Convert Mongoose document to plain object
          photo: {
            ...post.photo,
            data: base64Photo, // Replace binary data with base64 string
          },
        };
      }
      return post.toObject();
    });

    // Return the posts with a success response
    res.status(200).send({
      success: true,
      message: 'All posts fetched successfully',
      posts: postsWithBase64Photos,
    });
  } catch (error) {
    console.error('Error in fetching posts:', error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching posts',
      error: error.message, // Include the actual error message for debugging
    });
  }
};

export const getPostPhoto = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId).select('photo');
    if (!post || !post.photo.data) {
      return res.status(404).send({
        success: false,
        message: 'Photo not found',
      });
    }

    // Set the content type and send the photo data
    res.set('Content-Type', post.photo.contentType);
    res.send(post.photo.data);
  } catch (error) {
    console.error('Error in fetching photo:', error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching photo',
      error: error.message,
    });
  }
};

export const getClusteredPostsController = async (req, res) => {
  try {
    const user = req.user; // Logged-in user
    const userInterests = user.interests || []; // User's interests
    const allPosts = await postModel.find({}).lean(); // Fetch all posts

    // If there are no posts, return an empty response
    if (allPosts.length === 0) {
      return res.status(200).send({
        success: true,
        message: 'No posts available.',
        posts: [],
      });
    }

    // Prepare data for clustering
    const data = allPosts.map((post) => ({
      id: post._id,
      skills: post.skills,
    }));

    // Convert skills to numerical vectors
    const vectors = data.map((item) =>
      userInterests.map((interest) => (item.skills.includes(interest) ? 1 : 0))
    );

    // Apply K-Means clustering
    kmeans.clusterize(vectors, { k: Math.min(3, allPosts.length) }, (err, result) => {
      if (err) {
        console.error("Error in clustering:", err);
        return res.status(500).send({
          success: false,
          message: "Error in clustering posts.",
        });
      }

      // Find the cluster closest to the user
      const userVector = userInterests.map(() => 1); // User's vector
      const closestCluster = result.reduce(
        (closest, cluster) => {
          const distance = cluster.centroid.reduce(
            (sum, value, index) => sum + Math.abs(value - userVector[index]),
            0
          );
          return distance < closest.distance ? { cluster, distance } : closest;
        },
        { cluster: null, distance: Infinity }
      );

      // Fetch posts in the closest cluster
      const clusteredPosts = allPosts.filter((post) =>
        closestCluster.cluster.clusterInd.includes(
          data.findIndex((item) => item.id.equals(post._id))
        )
      );

      // Prioritize posts based on user interests
      const prioritizedPosts = clusteredPosts.map((post) => {
        const matchingInterests = post.skills.filter((skill) =>
          userInterests.includes(skill)
        ).length;
        return { ...post, matchingInterests };
      });

      // Sort posts by the number of matching interests (descending)
      prioritizedPosts.sort((a, b) => b.matchingInterests - a.matchingInterests);

      res.status(200).send({
        success: true,
        message: 'Posts fetched and prioritized based on your interests.',
        posts: prioritizedPosts,
      });
    });
  } catch (error) {
    console.error("Error in fetching prioritized posts:", error);
    res.status(500).send({
      success: false,
      message: "Error in fetching prioritized posts.",
      error,
    });
  }
};
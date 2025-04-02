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
    const user = req.user;
    const userInterests = user.interests || [];
    const allPosts = await postModel.find({}).populate('user', 'name').lean();

    if (allPosts.length === 0) {
      return res.status(200).send({
        success: true,
        message: 'No posts available.',
        posts: [],
      });
    }

    // First, prioritize posts that directly match user interests
    const postsWithScores = allPosts.map(post => {
      // Calculate matching score based on skills
      const matchingSkills = post.skills.filter(skill => 
        userInterests.includes(skill)
      ).length;
      
      // Additional scoring factors (optional)
      const sameUserLocation = post.user.location === user.location ? 1 : 0;
      const recentPost = (new Date() - new Date(post.createdAt)) < 604800000 ? 1 : 0; // 1 week
      
      return {
        ...post,
        matchScore: matchingSkills * 3 + sameUserLocation + recentPost // Weighted score
      };
    });

    // Sort by match score (descending)
    postsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    // If user has strong interests, return directly matched posts first
    if (userInterests.length > 0) {
      const stronglyMatchedPosts = postsWithScores.filter(post => post.matchScore > 0);
      if (stronglyMatchedPosts.length > 0) {
        return res.status(200).send({
          success: true,
          message: 'Posts matching your interests.',
          posts: stronglyMatchedPosts,
        });
      }
    }

    // Fallback to clustering when no direct matches
    const vectors = postsWithScores.map(post => 
      userInterests.map(interest => post.skills.includes(interest) ? 1 : 0)
    );

    kmeans.clusterize(vectors, { k: Math.min(3, postsWithScores.length) }, (err, result) => {
      if (err) {
        console.error("Clustering error:", err);
        // Return posts sorted by date if clustering fails
        const fallbackPosts = [...postsWithScores].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        return res.status(200).send({
          success: true,
          message: 'Showing recent posts.',
          posts: fallbackPosts,
        });
      }

      // Find cluster closest to user's interests
      const userVector = userInterests.map(() => 1);
      const closestCluster = result.reduce((closest, cluster) => {
        const distance = cluster.centroid.reduce(
          (sum, value, index) => sum + Math.abs(value - userVector[index]),
          0
        );
        return distance < closest.distance ? { cluster, distance } : closest;
      }, { cluster: null, distance: Infinity });

      // Get posts from closest cluster
      const clusteredPosts = postsWithScores.filter((_, index) =>
        closestCluster.cluster.clusterInd.includes(index)
      );

      // Combine direct matches (if any) with clustered results
      const finalPosts = [
        ...postsWithScores.filter(post => post.matchScore > 0),
        ...clusteredPosts.filter(post => post.matchScore === 0)
      ];

      res.status(200).send({
        success: true,
        message: 'Recommended posts based on your interests.',
        posts: finalPosts,
      });
    });
  } catch (error) {
    console.error("Error in post recommendation:", error);
    res.status(500).send({
      success: false,
      message: "Error in fetching posts.",
      error: error.message,
    });
  }
};

export const editPostController = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      skills,
      location,
      availability,
      experience,
      contact,
      expectedMoney,
      visibility,
      status,
    } = req.body;

    const post = await postModel.findById(req.params.pid);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'Post not found.',
      });
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        success: false,
        message: 'You are not authorized to edit this post.',
      });
    }

    // Update all fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    // Handle skills field (check if it's an array or a string)
    if (skills) {
      post.skills = Array.isArray(skills) ? skills : skills.split(',').map((skill) => skill.trim());
    }

    post.location = location || post.location;
    post.availability = availability || post.availability;
    post.experience = experience || post.experience;
    post.contact = contact || post.contact;
    post.expectedMoney = expectedMoney || post.expectedMoney;
    post.visibility = visibility || post.visibility;
    post.status = status || post.status;

    await post.save();

    res.status(200).send({
      success: true,
      message: 'Post updated successfully.',
      post,
    });
  } catch (error) {
    console.error('Error in editPostController:', error); // Log the error for debugging
    res.status(500).send({
      success: false,
      message: 'Error in updating post.',
      error: error.message, // Include the error message for debugging
    });
  }
};
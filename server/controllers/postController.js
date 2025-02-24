import postModel from "../models/postModel.js";
import fs from 'fs';
import slugify from 'slugify';

// Create Post || POST
export const createPostController = async (req, res) => {
    try {
        const { title, content, category, skills, location, availability, experience, contact, expectedMoney, visibility } = req.fields;
        const { photo } = req.files;

        if (!title || !content || !category || !skills || !location || !availability || !experience || !contact || !expectedMoney || !visibility) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        const post = new postModel({
            user: req.user._id,
            title,
            content,
            category,
            skills: skills.split(',').map(skill => skill.trim()),
            location,
            availability,
            experience,
            contact,
            expectedMoney,
            visibility
        });

        if (photo) {
            post.photo.data = fs.readFileSync(photo.path);
            post.photo.contentType = photo.type;
        }

        await post.save();
        res.status(201).send({
            success: true,
            message: 'Post Created Successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Creating Post',
            error
        });
    }
};

// Get User Posts || GET
export const getUserPostsController = async (req, res) => {
    try {
        const posts = await postModel.find({ user: req.user._id });
        res.status(200).send({
            success: true,
            message: 'User Posts Fetched Successfully',
            posts
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching User Posts',
            error
        });
    }
};

// Get All Posts || GET
export const getPostController = async (req, res) => {
    try {
        const posts = await postModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Posts Fetched Successfully',
            posts
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching Posts',
            error
        });
    }
};

// Get Single Post || GET
export const singlePostController = async (req, res) => {
    try {
        const post = await postModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Single Post Fetched Successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching Single Post',
            error
        });
    }
};

// Get Post Photo || GET
export const postPhotoController = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.pid).select("photo");
        if (post.photo.data) {
            res.set("Content-type", post.photo.contentType);
            return res.send(post.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching Post Photo',
            error
        });
    }
};

// Delete Post || DELETE
export const deletePostController = async (req, res) => {
    try {
        await postModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: 'Post Deleted Successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Deleting Post',
            error
        });
    }
};

// Update Post || PUT
export const updatePostController = async (req, res) => {
    try {
        const { title, content } = req.fields;
        const post = await postModel.findByIdAndUpdate(
            req.params.pid,
            { title, content },
            { new: true }
        );
        await post.save();
        res.status(200).send({
            success: true,
            message: 'Post Updated Successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Updating Post',
            error
        });
    }
};

// Add Bid to Post || POST
export const addBidController = async (req, res) => {
    try {
        const { postId, amount, timeSlot, message } = req.body;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }
        post.bids.push({
            user: req.user._id,
            amount,
            timeSlot,
            message
        });
        await post.save();
        res.status(200).send({
            success: true,
            message: 'Bid added successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in adding bid',
            error
        });
    }
};

// Add Rating to Post || POST
export const addRatingController = async (req, res) => {
    try {
        const { postId, rating } = req.body;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }
        post.ratings.push({
            user: req.user._id,
            rating
        });
        await post.save();
        res.status(200).send({
            success: true,
            message: 'Rating added successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in adding rating',
            error
        });
    }
};

// Add Like to Post || POST
export const addLikeController = async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }
        post.likes.push({
            user: req.user._id
        });
        await post.save();
        res.status(200).send({
            success: true,
            message: 'Like added successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in adding like',
            error
        });
    }
};

// Add Comment to Post || POST
export const addCommentController = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }
        post.comments.push({
            user: req.user._id,
            comment
        });
        await post.save();
        res.status(200).send({
            success: true,
            message: 'Comment added successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in adding comment',
            error
        });
    }
};
import postModel from "../models/postModel.js";
import fs from 'fs';
import slugify from 'slugify';

// Create Post || Post 
export const createPostController = async (req, res) => {
    try {
        const { name, description, price, stream, credit, barting, visibility, client, status } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(401).send({ message: 'Name is Required' });
            case !description:
                return res.status(401).send({ message: 'Description is Required' });
            case !price:
                return res.status(401).send({ message: 'Price is Required' });
            case !stream:
                return res.status(401).send({ message: 'Stream is Required' });
            case !credit:
                return res.status(401).send({ message: 'Credit is Required' });
            case !client:
                return res.status(401).send({ message: 'Client is Required' });
            case !status:
                return res.status(401).send({ message: 'Status is Required' });
            case photo && photo.size > 1000000:
                return res.status(401).send({ message: 'Photo should be less than 1 MB' });
        }
        const post = new postModel({ ...req.fields, slug: slugify(name) });
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
            message: 'Error in Create Post',
            error
        });
    }
};

// Get All Posts || Get
export const getPostController = async (req, res) => {
    try {
        const posts = await postModel
            .find({})
            .populate('stream')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            countTotal: posts.length,
            message: 'All The Posts Are : - ',
            posts,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Getting All Posts',
            error
        });
    }
};

// Single Post Controller
export const singlePostController = async (req, res) => {
    try {
        const post = await postModel.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("stream");
        res.status(200).send({
            success: true,
            message: 'Single Post is : - ',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Single Post',
            error,
        });
    }
};

// Post Photo Controller || Get
export const postPhotoController = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.pid).select("photo");
        if (post.photo.data) {
            res.set('Content-type', post.photo.contentType);
            return res.status(200).send(post.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Post Photo',
            error
        });
    }
};

// Delete Post Controller || Delete
export const deletePostController = async (req, res) => {
    try {
        await postModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Post Deleted Successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Deletion of Post',
            error
        });
    }
};

// Update Post Controller || Put
export const updatePostController = async (req, res) => {
    try {
        const { name, description, price, stream, credit, barting, visibility, client, status } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(401).send({ message: 'Name is Required' });
            case !description:
                return res.status(401).send({ message: 'Description is Required' });
            case !price:
                return res.status(401).send({ message: 'Price is Required' });
            case !stream:
                return res.status(401).send({ message: 'Stream is Required' });
            case !credit:
                return res.status(401).send({ message: 'Credit is Required' });
            case !client:
                return res.status(401).send({ message: 'Client is Required' });
            case !status:
                return res.status(401).send({ message: 'Status is Required' });
            case photo && photo.size > 1000000:
                return res.status(401).send({ message: 'Photo should be less than 1 MB' });
        }
        const post = await postModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            post.photo.data = fs.readFileSync(photo.path);
            post.photo.contentType = photo.type;
        }
        await post.save();
        res.status(201).send({
            success: true,
            message: 'Post Updated Successfully',
            post
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Update Post',
            error
        });
    }
};
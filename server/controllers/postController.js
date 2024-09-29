import postModel from "../models/postModel.js";
import fs from 'fs'
import slugify from 'slugify'

// Create Post || Post 

export const createPostController = async (req,res) =>{
    try {
        const {name,slug,description,price,stream,credit,barting} = req.fields
        const {photo} = req.files
        if(!name){
            res.status(401).send({message:'Name is Required'})
        }
        switch(true){
            case !name:
                return res.status(401).send({message:'Name is Required'})
            case !description:
                return res.status(401).send({message:'Description is Required'})
            case !price:
                return res.status(401).send({message:'Price is Required'})
            case !stream:
                return res.status(401).send({message:'Stream is Required'})
            case !credit:
                return res.status(401).send({message:'Credit is Required'})
            case photo && photo.size < 100000:
                return res
                .status(401)
                .send({
                    message:'Photo is Required and should be less then 1 mb'
                })       
            }
            const post =  new postModel({...req.fields,slug:slugify(name)})
            if(photo){
                post.photo.data = fs.readFileSync(photo.path)
                post.photo.contentType = photo.type
            }
            await post.save()
            res.status(201).send({
                success:true,
                message:'Post Created Successfully',
                post
            })
        }
    catch (error) {
        res.status(500).send({
            success:true,
            message:'Error in Create Post',
            error
        })
    }
};


// Get All Posts || GEt

export const getPostController = async (req,res) =>{
    try {
        const posts = await postModel
        .find({})
        .populate('stream')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            counTotal: posts.length,
            message:'All The Posts Are : - ',
           
            posts,
            
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error is GEtting All Posts',
            error
        })
    }
}


// Single Post Controller

export const singlePostController = async (req,res) =>{ 
    try {
        const post = await postModel.findOne({slug:req.params.slug})
        .select("-photo")
        .populate("stream")
        res.status(200).send({
            success:true,
            message:'Single Post is : - ',
            post
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error IN Single Post',
            error,
        })
        
    }
}


// postPhotoController || GEt

export const postPhotoController = async (req,res) =>{
    try {
        const post = await postModel.findById(req.params.pid).select("photo")
        if(post.photo.data){
            res.set('Content-type',post.photo.contentType)
            return res.status(200).send(post.photo.data)
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Post Photo',
            error
        })
    }
}


// Delete Post Controller || Delete

export const deletePostController = async (req,res) =>{
    try{
        await postModel.findById(req.params.pid)
        .select("-photo")
        res.status(200).send({
            success:true,
            message:'Post Deleted Successfully'
        })
    }
    catch (error){
        res.status(500).send({
            success:false,
            message:'Error in Deletion of Post',
            error
        })
    }
}


// Update Post Controller

export const updatePostController = async (req,res) => {
    try {
        const {name,slug,description,price,stream,credit,barting} = req.fields
        const {photo} = req.files
        if(!name){
            res.status(401).send({message:'Name is Required'})
        }
        switch(true){
            case !name:
                return res.status(401).send({message:'Name is Required'})
            case !description:
                return res.status(401).send({message:'Description is Required'})
            case !price:
                return res.status(401).send({message:'Price is Required'})
            case !stream:
                return res.status(401).send({message:'Stream is Required'})
            case !credit:
                return res.status(401).send({message:'Credit is Required'})
            case photo && photo.size < 100000:
                return res
                .status(401)
                .send({
                    message:'Photo is Required and should be less then 1 mb'
                })       
            }
            const post =  await postModel.findByIdAndUpdate(req.params.pid,
                {
                    ...req.fields,slug:slugify(name)},{new:true}
        )
            if(photo){
                post.photo.data = fs.readFileSync(photo.path)
                post.photo.contentType = photo.type
            }
            await post.save()
            res.status(201).send({
                success:true,
                message:'Post Updated Successfully',
                post
            })
        }
    catch (error) {
        res.status(500).send({
            success:true,
            message:'Error in Update Post',
            error
        })
    }
};
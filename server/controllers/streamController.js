import { model } from "mongoose";
import streamModel from "../models/streamModel.js";
import slugify from "slugify";

// Create Stream Controller 

export const createStreamController = async (req,res)  =>{
    try{
        const {name} = req.body
        if(!name){
            return res.status(401).send({message:"Name is Required"})
        }
        const existingStream = await streamModel.findOne({name})
        if(existingStream){     
            return res.status(200).send({
                succes:true,
                message:'Stream Already Exists'
            })     
        }
        const stream = await new streamModel({
            name,
            slug:slugify(name)
        }).save();
        res.status(201).send({
            success:true,
            message:'New Stream Created Succesfully',
            stream
        })
    }
    catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error is Stream',
            error
        })
    }
};



// Update Stream Controller 

export const updateStreamController = async (req,res) =>{
    try{
        const {name}= req.body
        const {id} = req.params
        const stream = await streamModel.findByIdAndUpdate(
            id,
            {name,slug:slugify(name) },
            {new:true}
        );
        res.status(200).send(
            {
                success:true,
                message:"Stream Updated Successfully",
                stream
            }
        )
    }
    catch (error){
        res.status(500).send({
            success:false,
            message:'Error in Update',
            error
        })
    }
};


//  Get Stream Controller 

export const getStreamController = async (req,res) =>{
    try {
        const stream = await streamModel.find({})
        res.status(200).send({
            success:true,
            message:'All Streams Are : - ',
            stream
        })
    } catch (error) {
        res.status(500).send(
            {
                success:false,
                message:'Error in Get Stream',
                error
            }
        )
    }
}


// Single Stream Controller 
export const singleStreamController = async (req,res) => {
    try {
        const stream = await streamModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Single Stream is : - ',
            stream
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Single Stream',
            error
        })
    }
}


// Delete Stream Controller || Delete

export const deleteStreamController = async (req,res) =>{
    try {
        const {id} = req.params
        await streamModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Stream Deleted Successfully'
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Delete',
            error
        })
    }
}
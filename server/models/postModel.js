import mongoose from "mongoose";
 
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stream:{
        type:mongoose.ObjectId,
        ref:"streams"
    },
    credit:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    barting:{
        type:Boolean,
    },
    bids: [{
        user: {
            type: mongoose.ObjectId,
            ref: "users"
        },
        amount: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    rating: {
        type: Number,
        default: 0,
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    client: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "pending"],
        default: "active"
    }
},
{timestamps:true}
);

export default mongoose.model('posts',postSchema)
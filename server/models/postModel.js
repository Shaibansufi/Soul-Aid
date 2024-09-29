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
},
{timestamps:true}
);

export default mongoose.model('posts',postSchema)
import mongoose from "mongoose";
import slugify from "slugify";

const streamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
        // required:true,
    },
});

export default mongoose.model('streams',streamSchema)
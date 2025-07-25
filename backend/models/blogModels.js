import mongoose from "mongoose"
import validator from "validator"

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    blogImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    category:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
        minLength:[200,"should contain atleast 200 characters"]
    },
    adminName:{
        type:String,
        // required:true,
    },
    adminPhoto:{
        type:String,
        // required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
export const Blog=mongoose.model("Blog",blogSchema)
import mongoose from "mongoose";
import { Blog } from "../models/blogModels.js";
import {v2 as cloudinary} from "cloudinary"

export const createBlog=async (req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({
                message:"Blog image is Required"
            })
        }
        const {blogImage}=req.files;
        const allowedFormat=["image/jpeg","image/png","image/jpg"];
        if(!allowedFormat.includes(blogImage.mimetype)){
            return res.status(400).json({
                message:"Invalid Photo Format"
            })
        }
        const {title,category,about}=req.body;
        if(!title || !category || !about ){
            return res.status(400).json({
                message:"title category and about are required filled"
            })
        }
        const adminName=req?.user?.name;
        const adminPhoto=req?.user?.photo?.url;
        const createdBy=req?.user?._id;
        const cloudinaryResponse=await cloudinary.uploader.upload(
            blogImage.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }
        const blogData={title,about,category,adminName,adminPhoto,createdBy,blogImage:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.url
        }};
        const blog=await Blog.create(blogData)
        if(blog){
            res.status(200).json({
                message:"Blog Created SDuccessfully",
                blog,
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal server error"
        })
    }
    
}

export const deleteBlog=async(req,res)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById(id);
        if(!blog){
            return res.status(404).json({messgae:"Blog not found"})
        }
        await blog.deleteOne();
        res.status(200).json({message:"Blog Deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getAllBlogs=async(req,res)=>{

        const allBlogs=await Blog.find();
        res.status(200).json(allBlogs);
    
}

export const getSingleBlogs=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return req.status(404).json({error:"id not found"})
        }
        const blog=await Blog.findById(id);
        if(!blog){
            return res.status(404).json({error:"blog not found"});
        }
        res.status(200).json(blog);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMyBlogs=async(req,res)=>{
    const createdBy=req.user._id;
    const myBlogs=await Blog.find({createdBy});
    res.status(200).json(myBlogs);
}

export const updateBlog=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({error:"id not found"})
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.category = req.body.category || blog.category;
    blog.about = req.body.about || blog.about;

    // Handle image upload
    if (req.files && req.files.blogImage) {
      // Optional: delete old image from cloudinary using blog.blogImage.public_id

      const uploaded = await cloudinary.uploader.upload(
        req.files.blogImage.tempFilePath
      );
      blog.blogImage = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id
      }; // or { url: uploaded.secure_url } if that's your schema
    }

    await blog.save();
    res.status(200).json(blog);
}
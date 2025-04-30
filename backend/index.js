// const express=require('express');
import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoutes.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import configureCloudinary from "./config/cloudinary.js";
import cors from "cors";

dotenv.config();
const app=express();
const port=process.env.PORT;

app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",  // allow React app
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],                 // allow cookies (if you're using them)
  }));

dbConnect();

app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute)

// Cloudinary
configureCloudinary();

app.listen(port,()=>{
    console.log('App listening at port no:5000')
})
app.get('/',(req,res)=>{
    res.send(`<h1>hello world</h1>`);
})
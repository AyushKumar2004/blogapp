import { User } from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary"
import createTokenAndSaveCookies from "../jwt/authToken.js"
import bcrypt from "bcrypt"
export const register=async (req,res)=>{
    try{
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({
                message:"User Photo is Required"
            })
        }
        const {photo}=req.files;
        const allowedFormat=["image/jpeg","image/png","image/jpg"];
        if(!allowedFormat.includes(photo.mimetype)){
            return res.status(400).json({
                message:"Invalid Photo Format"
            })
        }
        const {email,name,password,phone,education,role}=req.body;
        if(!email || !name || !password || !phone || !education || !role){
            return res.status(400).json({
                message:"Please fill the required fields"
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User Already exista with this Email"
            })
        }
        const cloudinaryResponse=await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({name,email,password:hashedPassword,phone,education,role,photo:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.url
        }});
        await newUser.save()
        if(newUser){
            let token=await createTokenAndSaveCookies(newUser._id,res);
            res.status(200).json({
                message:"user registered SDuccessfully",
                newUser,
                token:token,
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal server error"
        })
    }
    
}

export const login=async(req,res)=>{
    const {email,password,role}=req.body;
    try{
        if(!email || !password || !role){
            return res.status(400).json({
                message:"please fill the required field"
            })
        }
        const user=await User.findOne({email}).select("+password");
        console.log(user)
        if(!user.password){
            return res.status(400).json({message:"User password is misiing"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!user|| !isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        if(user.role!==role){
            return res.status(400).json({
                message:`Given role ${role} not found`
            })
        }
        let token=await createTokenAndSaveCookies(user._id,res);
        console.log('login token:',token)
        res.status(200).json({
            message:"user loggedIn successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                photo:user.photo,
                role:user.role,
            },
            token:token,
        })
    }catch(error){
        console.log(error)
        return res.status(400).json({
            message:"Internal server error"
        })
    }
}

export const logout=(req,res)=>{
    try{
        res.clearCookie('jwt',{httpOnly:true});
        res.status(200).json({message:"UserLogged out successfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMyProfile=async(req,res)=>{
    const user=await req.user;
    res.status(200).json({user});
}

export const getAdmin=async(req,res)=>{
    const admins=await User.find({role:"admin"});
    res.status(200).json(admins);
}
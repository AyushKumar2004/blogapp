import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"

// authentication
export const isAuthenticated=async(req,res,next)=>{
    try{
        console.log(req.cookies);
        const token=req.cookies.jwt;
        console.log("middleware:",token);
        if(!token){
            return res.status(401).json({
                error:"User not authenticated"
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decoded);
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        req.user=user;
        next();
    }catch(error){
        console.log(error);
        res.sattus(400).json({
            message:"Internal server error"
        })
    }
}

export const isAdmin=(...roles)=>{
    return (req,res,next)=>{
        try{
            if(!roles.includes(req.user.role)){
                return res.status(403).json({error:`Userwith given role ${req.user.role} not allowed`})
            }
            console.log('hello')
            next();
        }catch(error){
            console.log(error);
            res.status(500).json({error:"Internal server error"})
        }
        
    }
}
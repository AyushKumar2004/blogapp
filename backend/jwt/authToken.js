import jwt from "jsonwebtoken"
import {User} from "../models/userModel.js"

const createTokenAndSaveCookies=async(userId,res)=>{

    const token= jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"15d"
    })
    console.log(token);
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        path:"/"
    })
    await User.findByIdAndUpdate(userId,{token});
    return token
}

export default createTokenAndSaveCookies;
import {v2 as cloudinary} from "cloudinary"
import Dotenv  from "dotenv";
Dotenv.config()

const configureCloudinary=async(req,res)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
    });
}

export default configureCloudinary;
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connection sucessfully created"))
    .catch((error)=>{
        console.log(error);
    });
}

export default dbConnect;
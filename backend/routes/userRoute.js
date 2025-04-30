import express from "express"
import { getAdmin, getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authUser.js";
const router=express.Router();

router.post("/register",register);
router.post('/login',login);
router.get('/logout',isAuthenticated,logout);
router.get("/my-profile",isAuthenticated,getMyProfile);
router.get("/admins",getAdmin);

export default router
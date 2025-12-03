// import { Router } from "express";
// const router = Router

// import {Request,Response} from "express"

// Duivabei router ke import korte pari ...express theke ...
import express  from "express";
import { userContollers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router = express.Router()



// routes -> controller -> service : 

// "/" --> localhost:5000/users ke indicate korbe ...


// app.use("/users",userRoutes)..
// Create an User : 
 router.post("/",userContollers.createUser)


 // Get user data : 
router.get("/", logger, auth("admin") ,userContollers.getUser);


// Get single User Data : 
// app.use("/users/:id",userRoutes) -->  
router.get("/:id",auth("admin","user"),userContollers.getSingleUser)

// Update User Info 
router.put("/:id",userContollers.updateUserInfo);
// 

// Delete User Info : 
router.delete("/:id",userContollers.deleteUserInfo);

export const userRoutes= router; // Name Export 
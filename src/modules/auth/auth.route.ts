
//Router ta ke import korte hobe express theke :
import { Router } from "express";
import { Request,Response } from "express";
import { authController } from "./auth.controller";

const router = Router()


// post method use kore password validation kora lage : 

// http://localhost:5000/auth/login e hit korbe ...
router.post("/login",authController.loginUser);

export const authRoutes= router
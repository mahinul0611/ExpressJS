import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req:Request, res: Response)=>{


    const {email,password} = req.body
   

     try {
        // try block er moddhe query likhbo :
    
         const result = await authServices.loginUser(email,password) ; // Parameterized way te pathabo jeno sql injection attack na hoy ... $1 $2 diye parameterized kora holo :
    
        // console.log(result.rows[0]);
        res.status(200).json({
          success: true,
          message: "Login Succesful",
          data: result,
        });
        // res.send({
        //     message:"Data Inserted Succesfully",
        // })
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }


}

export const authController = {
    loginUser,
}
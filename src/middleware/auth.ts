
// Auth Middleware :  eta bujhte hole amader ke higher order function bujhte hobe : 

import {NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


// Higher order function : parameter hisebe function ney and ekta function return kore ...
// parameter naw ney ba ejekuno parameter ney and ekta function return kore sheta higher order function : 

// Higher order function returns a function : 


// role =["admin","user"];
// ...role :string[] --> rest operator ...
const auth= (...roles: string[])=>{
    return async (req:Request,res:Response, next: NextFunction)=>{
          try  {

             const token = req.headers.authorization;
        //    console.log({authToken: token}); 
        if(!token){
            return res.status(500).json({
                    message : "You are not Allowed!!!",
            })
        }

        const decoded = jwt.verify(token,config.jwtSecret as string) as JwtPayload ;
        console.log({decoded}) 
        req.user = decoded 

        // ["admin"] ...
        if(roles.length && !roles.includes(decoded.role as string)){
          return res.status(500).json({
            success:false,
            error:"Unauthorized"
          })
        }

        next();
          }catch (err:any){
            res.status(500).json({
                success: false,
                message: err.message
            })
          }
    }
}



export default auth;






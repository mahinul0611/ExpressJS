import { NextFunction,Request,Response } from "express";

const logger =(req:Request,res:Response,next:NextFunction)=>{

    // body ta ke modify kora jabe ei middleware e ..MITM (Man in the Middle) er moto .. request modify kora jabe ekhan theke ...

    

    console.log(`[${new Date().toISOString()}]  ${req.method} ${req.path}\n`)

    next();

}

export default logger;
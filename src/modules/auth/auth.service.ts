import { pool } from "../../config/db"

import bcrypt from "bcryptjs"
import  config  from "../../config/index"
import jwt from "jsonwebtoken"


const loginUser= async (email:string,password:string)=>{

    // first e email ache kina sheta check then email thakle password validation : 
    const result = await pool.query(`
        
        SELECT * FROM users WHERE email=$1
        
        `,[email])

        console.log({result});
        if(result.rows.length===0){
            return null;
        }


        const user = result.rows[0] // user rows er 0 nmbr index e ache : 

        const isMatched= await bcrypt.compare(password,user.password);

        console.log({isMatched,user});
        
        if(!isMatched){
            return false
        }

        // return user kore dite pari chaile but eta korle barbar authenticate/login kora lagbe which is a hassle : 

        // tai amra jwt generate korbo : 

        // const secret = 

        const token = jwt.sign({name : user.name, email: user.email, role: user.role}, config.jwtSecret as string,
            {
                expiresIn :"7d"

            }
        )
        console.log({token})
       
       return {token, user};
        
}

export const authServices = {
        loginUser,
}
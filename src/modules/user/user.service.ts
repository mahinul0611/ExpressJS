import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

// Business logic gula service e likhbo ...

// USER BUSINESS LOGIC : 
const createUser = async (payload : Record<string,unknown>)=>{

  const {name,role,email,password} = payload; // payload ta req.body ke indicate kore ...

  // Password HASH korbo : 
  // plain text e pathabo na  bcrypt package use korbo search on google :

  const hashedPass= await bcrypt.hash(password as string,10)


    const result =await pool.query(
      `
            
            INSERT INTO users(name,role,email,password) VALUES($1,$2,$3,$4) 
            RETURNING * 
            `,
      [name,role, email,hashedPass]
    )
return result 
}


const getUser =async()=>{
  const result=   await pool.query(`
        
        SELECT * FROM users 

        `);
        return result 
}


const getSingleUser= async(id:string)=>{
    
    const result =  await pool.query(
      `
        
        SELECT * FROM users WHERE id=$1

        `,
      [id]
    );
    return result ;
}


const updateUserInfo = async(name:string,email:string,id:string)=>{
    const result = await pool.query(
      `
        UPDATE users SET name=$1, email=$2 WHERE id=$3
       RETURNING *

        `,
      [name, email, id]
    );
    return result ; 
}

const deleteUserInfo= async (id:string)=>{
    const result = await pool.query(
      `
        
        DELETE  FROM users WHERE id=$1

        `,
      [id]
    );
    return result ;
}

export const userServices = {
    createUser,
    getUser,
    getSingleUser,
    updateUserInfo,
    deleteUserInfo
}
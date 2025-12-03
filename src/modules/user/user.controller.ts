
import { Request,Response } from "express";
import { userServices } from "./user.service";

const createUser= async (req: Request, res: Response) => {
  // console.log(req.body);

  const { name, email,password } = req.body; // destructuring kore nilam ,,

  // query insert korte hobe ekhon :

  // try catch block dile async function hote hbe ..

  try {
    // try block er moddhe query likhbo :

    const result = await userServices.createUser(req.body) ; // Parameterized way te pathabo jeno sql injection attack na hoy ... $1 $2 diye parameterized kora holo :

    // console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Data Inserted Succesfully",
      data: result.rows[0],
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

const getUser = async (req: Request, res: Response) => {
  // Shobgula user er data dekhte chacchi :

  try {
    const result = await userServices.getUser()
    res.status(200).json({
      success: true,
      message: "All user data fetched from Database Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
  // res.send({message:"API is working..."})

  // Single user er data dekhte chacchi :

  try {
    const result =await userServices.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        data: result.rows[0],
      });
    }
    console.log(result.rows);
    //SELECT * FROM users WHERE id=${req.params.id}   evabe dile sql injection attack hobe tai evabe dibo na ...
    // res.status(200).json({
    //     success:true,
    //     message:"All user data fetched from Database Successfully",
    //     data: result.rows,
    // })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
}

const updateUserInfo = async (req: Request, res: Response) => {
  // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
  // res.send({message:"API is working..."})

  // Single user er data dekhte chacchi :

  const { name, email } = req.body; // je datagula update korbo shegula destructuring kore fellam

  //parameterized way te dicchi 1st param e jabe name 2nd params e jabe email :
  try {
    const result = await userServices.updateUserInfo(name,email,req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User data updated successfully",
        data: result.rows[0],
      });
    }
    // console.log(result.rows);
    //SELECT * FROM users WHERE id=${req.params.id}   evabe dile sql injection attack hobe tai evabe dibo na ...
    // res.status(200).json({
    //     success:true,
    //     message:"All user data fetched from Database Successfully",
    //     data: result.rows,
    // })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      //   details: err,
    });
  }
}

const deleteUserInfo= async (req: Request, res: Response) => {
  // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
  // res.send({message:"API is working..."})

  // Single user er data dekhte chacchi :

  try {
    const result = await userServices.deleteUserInfo(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User data deleted successfully",
        data: result.rows,
      });
    }
    console.log(result.rows);
    //SELECT * FROM users WHERE id=${req.params.id}   evabe dile sql injection attack hobe tai evabe dibo na ...
    // res.status(200).json({
    //     success:true,
    //     message:"All user data fetched from Database Successfully",
    //     data: result.rows,
    // })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
}

export const userContollers= {
    createUser,
    getUser,
    getSingleUser,
    updateUserInfo,
    deleteUserInfo
}


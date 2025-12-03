import { Request,Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.services";


const createTodo= async (req: Request, res: Response) => {
  const { title, user_id } = req.body;

  try {
    const result = await todoServices.createTodo(req.body)

    res.status(201).json({
      success: true,
      message: "Todo Created Succesfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getTodo =  async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo()

    res.status(200).json({
      success: true,
      message: "All Todo found Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

const getSingleTodo = async (req: Request, res: Response) => {
  // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
  // res.send({message:"API is working..."})

  // Single user er data dekhte chacchi :

  try {
    const result = await todoServices.getSingleTodo(req.params.id as string)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Found successfully",
        data: result.rows[0],
      });
    }
  
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    //   details: err,
    });
  }
}

const updateTodo = async (req: Request, res: Response) => {
  // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
  // res.send({message:"API is working..."})

  // Single user er data dekhte chacchi :

  const { title } = req.body; // je datagula update korbo shegula destructuring kore fellam

  //parameterized way te dicchi 1st param e jabe name 2nd params e jabe email :
  try {
    const result = await todoServices.updateTodo(title,req.params.id as string)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: result.rows[0],
      });
    }
   
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      //   details: err,
    });
  }
}

const deleteTodo = async (req: Request, res: Response) => {
  // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
  // res.send({message:"API is working..."})

  // Single user er data dekhte chacchi :

  try {
    const result = await todoServices.deleteTodo(req.params.id!)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        data: result.rows,
      });
    }
    console.log(result.rows);
  
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    //   details: err,
    });
  }
}


export const todoController ={
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo

}
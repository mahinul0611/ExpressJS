import config from "../src/config";
import express, { NextFunction, Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();


//parser : middleware

app.use(express.json());
// Database :

// Initializing Database:
initDB();

// MiddleWare Likhbo :   logger MiddleWare
// Image Upload ... er kaj ei middleware e likhte pari

// MiddleWare::
// "/" --> localhost:5000 ke indicate kore ...

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Express JS Developer");
});

// users CRUD operations :

// Middleware use korbo : app.use ...

app.use("/users", userRoutes); //POST er kaj korbe  app.use  GET er o kaj korbe .

app.use("/todos", todoRoutes);

// GET API CREATION : to fetch data from database :

// Shobgula user er data dekhte chacchi :

// Single id pawar jnne query :
// /users/1212   || /users/sdsgs  // duirokomer user id e detect korbe
// app.get("/users/:id", async (req: Request, res: Response) => {
//   // console.log(req.params.id); // req.params.id te dynamic id gula peye jabo ...
//   // res.send({message:"API is working..."})

//   // Single user er data dekhte chacchi :

//   try {
//     const result = await pool.query(
//       `

//         SELECT * FROM users WHERE id=$1

//         `,
//       [req.params.id]
//     );

//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "User data fetched successfully",
//         data: result.rows[0],
//       });
//     }
//     console.log(result.rows);
//     //SELECT * FROM users WHERE id=${req.params.id}   evabe dile sql injection attack hobe tai evabe dibo na ...
//     // res.status(200).json({
//     //     success:true,
//     //     message:"All user data fetched from Database Successfully",
//     //     data: result.rows,
//     // })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       details: err,
//     });
//   }
// });

// PUT/patch METHOD to update details of a user  :

// app.put("/users/:id", );

// DELETE operation :

// app.delete("/users/:id", );

// TODOs crud Operation ::

// Create a TODO :

// app.post("/todos", );

// Get operation to see al the todos :

// sokol todos dekhar jnne ...
// app.get("/todos",);

//TODOS  just single todo pabo kivabe ???

// app.get("/todos/:id", );

// TODOS UPDATE A TODO :

// app.put("/todos/:id", );

//TODOS  DELETE a todo :

// app.delete("/todos/:id", );


// auth routes : 

app.use("/auth",authRoutes)


// NOT FOUND ROUTE : always last e rakhbo ..

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});


export default app;



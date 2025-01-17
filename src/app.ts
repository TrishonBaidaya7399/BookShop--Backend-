import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BookRoutes } from "./app/config/modules/books/routes/books.route";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", BookRoutes);

// get A controller
const getAController = (req: Request, res: Response) => {
  const message = "Welcome to BookShop😇!";
  res.send(message);
};

// trigger to the router to get A
app.get("/", getAController);

export default app;

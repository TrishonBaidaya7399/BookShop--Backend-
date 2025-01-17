import express from "express";
import { BookControllers } from "../controller/books.controller";
const router = express.Router();
router.post("/", BookControllers.createBook);
export const BookRoutes = router;

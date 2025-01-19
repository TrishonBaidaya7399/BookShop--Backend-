import express from "express";
import { BookControllers } from "../controller/books.controller";
const router = express.Router();
// route to create a new book
router.post("/", BookControllers.createBook);
// route to get all the books
router.get("/", BookControllers.getAllBooks);
// route to get a single book by _id
router.get("/:productId", BookControllers.getSingleBook);
// route to update a single book by _id
router.put("/:productId", BookControllers.updateBook);
// route to delete a single book by _id
router.delete("/:productId", BookControllers.deleteBook);
export const BookRoutes = router;

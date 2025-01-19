import { Request, Response } from "express";
import BookValidationSchema from "../validator/BookValidationSchema";
import { BookServices } from "../service/books.service";

// create Book controller ------------------------------------------------------
const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    // ------------- Validate data using Zod validator ------------------------
    const validatedBookData = BookValidationSchema.parse(bookData);
    console.log(validatedBookData);
    const result = await BookServices.createBookIntoDB(validatedBookData);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to created book",
      error: error,
    });
  }
};
// get all books controller ------------------------------------------------------
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooksFromIntoDB();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || "Failed to retrieve books",
      error: error,
    });
  }
};

export const BookControllers = {
  createBook,
  getAllBooks,
};

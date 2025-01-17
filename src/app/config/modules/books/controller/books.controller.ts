import { Request, Response } from "express";
import BookValidationSchema from "../validator/BookValidationSchema";
import { BookServices } from "../service/books.service";

const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    // ------------- Validate data using Zod validator ------------------------
    const validatedBookData = BookValidationSchema.parse(bookData);
    console.log(validatedBookData);
    const result = await BookServices.createBookIntoDB(
        validatedBookData
    );
    //send res
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

export const BookControllers = {
  createBook,
};

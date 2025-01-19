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
// get a single book by _id ------------------------------------------------------
const getSingleBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId;
    const result = await BookServices.getSingleBookFromIntoDB(bookId);
    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: "No book found with this id",
        data: result,
      });
    } else if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error: error || "Failed to retrieve book",
    });
  }
};

// update a book by _id -----------------------------------------------------------
const updateBook = async (req: Request, res: Response) => {
  const productId = req?.params?.productId;
  // const existingBook = await BookServices.getSingleBookFromIntoDB(productId);
  const updatedData = req?.body;
  const validatedData = BookValidationSchema.parse(updatedData);
  try {
    const result = await BookServices.updateBookIntoDB(
      productId,
      validatedData
    );
    if (!result) {
      res.status(200).json({
        success: false,
        message: "Didn't find any book with this id to update",
        data: result,
      });
    } else if (result) {
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: (error as Error)?.message || "Failed to update the book",
      error: error,
    });
  }
};
// delete a book ------------------------------------------------------------------
const deleteBook = async (req: Request, res: Response) => {
  const productId = req?.params?.productId;
  try {
    const result = await BookServices.deleteBookFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message || "Failed to delete book",
      error: error,
    });
  }
};
export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};

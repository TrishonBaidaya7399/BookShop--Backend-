import mongoose from "mongoose";
import { TBooks } from "../interface/books.interface";
import { BookModel } from "../module/books.module";

// create a new book
const createBookIntoDB = async (book: TBooks) => {
  if (await BookModel.isBookExists(book?.title)) {
    throw new Error(
      `A book is exists with the same title: '${book?.title}', please publish wth another title`
    );
  }
  const result = await BookModel.create(book); // mongoose build in static method
  return result;
};
// get all books
const getAllBooksFromIntoDB = async () => {
  const result = await BookModel.find();
  return result;
};
// get a single book by id
const getSingleBookFromIntoDB = async (_id: string) => {
  const result = await BookModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(_id) } },
  ]);
  return result;
};
// update book
const updateBookIntoDB = async (_id: string, book: TBooks) => {
  try {
    // Check if the book with the given ID exists
    const existingBook = await BookModel.findById(_id);
    if (!existingBook) {
      throw new Error("Invalid ID");
    }

    const updatedBook = await BookModel.findByIdAndUpdate(_id, book, {
      new: true,
      runValidators: true,
    });

    return updatedBook;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
// delete book
const deleteBookFromDB = async (_id: string) => {
  try {
    // Check if the book with the given ID exists
    const existingBook = await BookModel.findById(_id);
    if (!existingBook) {
      throw new Error("Invalid ID");
    }

    const deleteResult = await BookModel.updateOne(
      { _id: _id },
      { isDeleted: true }
    );

    if (deleteResult.modifiedCount === 0) {
      throw new Error("Failed to delete the book");
    }

    return deleteResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred during deletion");
    }
  }
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromIntoDB,
  getSingleBookFromIntoDB,
  updateBookIntoDB,
  deleteBookFromDB,
};

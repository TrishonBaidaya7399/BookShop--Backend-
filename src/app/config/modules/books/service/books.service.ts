import { TBooks } from "../interface/books.interface";
import { BookModel } from "../module/books.module";

const createBookIntoDB = async (book: TBooks) => {
  // For static instance method ----------------------------------------------------------------------------
  if (await BookModel.isBookExists(book?.title)) {
    throw new Error(
      `A book is exists with the same title: '${book?.title}', please publish wth another title`,
    );
  }
  const result = await BookModel.create(book); // mongoose build in static method
  return result;
};

export const BookServices = {
  createBookIntoDB,
};

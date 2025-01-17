import { model, Schema } from "mongoose";
import { IBookModal, TBooks } from "../interface/books.interface";

const bookSchema = new Schema<TBooks, IBookModal>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Query middleware -----------------------------------------------------------------------------------
bookSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } }); // this will filter out the deleted books
  next();
});
bookSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
bookSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// for static instance method ----------------------------------------
bookSchema.statics.isBookExists = async function (title: string) {
  const existingBook = await BookModel.findOne({ title });
  return existingBook;
};
export const BookModel = model<TBooks, IBookModal>("Book", bookSchema);

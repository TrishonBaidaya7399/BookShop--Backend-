import { z } from "zod";

const BookValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title should be at least 3 characters" }),
  author: z.string({ required_error: "Author is required" }),
  price: z.number({ required_error: "Price is required" }),
  category: z.string({ required_error: "Category is required" }),
  description: z.string().optional(),
  quantity: z.number({ required_error: "Quantity is required" }),
  inStock: z.boolean({ required_error: "In Stock is required" }),
  isDeleted: z.boolean().optional(),
});

export default BookValidationSchema;

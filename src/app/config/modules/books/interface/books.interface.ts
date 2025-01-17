import { Model } from "mongoose";

export type TBooks = {
  title: string;
  author: string;
  price: number;
  category: string;
  description?: string;
  quantity: number;
  inStock: boolean;
  isDeleted?: boolean;
};

export interface IBookModal extends Model<TBooks> {
  isBookExists(title: string): Promise<TBooks | null>;
}

import { Model } from "mongoose";

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
};

export interface IOrderModal extends Model<TOrder> {
  isOrderExists(Id: string): Promise<TOrder | null>;
}

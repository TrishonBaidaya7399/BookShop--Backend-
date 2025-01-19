import { model, Schema } from "mongoose";
import { IOrderModal, TOrder } from "../interface/orders.interface";

const orderSchema = new Schema<TOrder, IOrderModal>(
  {
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);

orderSchema.statics.isOrderExists = async function (id: string) {
  const existingOrder = await OrderModel.findOne({ product: id });
  return existingOrder;
};
export const OrderModel = model<TOrder, IOrderModal>("Order", orderSchema);

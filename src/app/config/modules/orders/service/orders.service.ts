import { TOrder } from "../interface/orders.interface";
import { OrderModel } from "../module/orders.module";

const createOrderIntoDB = async (order: TOrder) => {
  // Check if an order for the product already exists
  const existingOrder = await OrderModel.isOrderExists(order.product);
  if (existingOrder) {
    throw new Error("Order has already been placed for this book.");
  }

  // Create a new order
  const result = await OrderModel.create(order);
  return result;
};
const getOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const getTotalRevenueFromDB = async () => {
  const result = await OrderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
  ]);
  const totalRevenue = result[0]?.totalRevenue;
  return totalRevenue;
};
export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getTotalRevenueFromDB,
};

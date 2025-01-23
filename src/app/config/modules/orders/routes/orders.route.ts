import express from "express";
import { OrdersController } from "../controller/orders.controller";
const router = express.Router();
// route to create an order for a book
router.post("/", OrdersController.createOrder);
// route to get all orders
router.get("/get-all-orders", OrdersController.getAllOrders);
// route to get total revenue
router.get("/revenue", OrdersController.getTotalRevenue);
export const OrdersRoutes = router;

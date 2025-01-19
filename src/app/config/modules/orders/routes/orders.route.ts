import express from "express";
import { OrdersController } from "../controller/orders.controller";
const router = express.Router();
// route to create an order for a book
router.post("/", OrdersController.createOrder);
export const OrdersRoutes = router;

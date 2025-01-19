import { Request, Response } from "express";
import mongoose from "mongoose";
import { BookModel } from "../../books/module/books.module";
import { OrderService } from "../service/orders.service";
import { OrderModel } from "../module/orders.module"; // Assuming OrderModel is the Mongoose model for orders

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, quantity, email, totalPrice } = req.body;
    console.log({ Body: req?.body });

    // Validate required fields
    if (!product || !quantity || !email) {
      res.status(400).json({
        success: false,
        message: "Product ID, quantity, and email are required.",
      });
      return;
    }

    // Validate Product ID format
    if (!mongoose.Types.ObjectId.isValid(product)) {
      res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
      return;
    }

    // Check if the product exists in BookModel
    console.log("Looking for Book with ID:", product);
    const findBook = await BookModel.findOne({
      _id: new mongoose.Types.ObjectId(product),
    });
    console.log("Result of findOne query:", findBook);

    if (!findBook || findBook.isDeleted === true) {
      res.status(404).json({
        success: false,
        message: "Book not found with the provided ID.",
      });
      return;
    }

    // Check if the requested quantity is available
    if (findBook.quantity < quantity) {
      res.status(400).json({
        success: false,
        message: "Insufficient quantity available.",
      });
      return;
    }

    // Check if an order for the same product by the same user already exists
    const existingOrder = await OrderModel.findOne({
      product: new mongoose.Types.ObjectId(product),
      email,
    });

    if (existingOrder) {
      // Update the existing order's quantity and totalPrice
      const updatedQuantity = existingOrder.quantity + quantity;
      const updatedTotalPrice = existingOrder.totalPrice + totalPrice;

      // Ensure the requested quantity is still available after updating
      if (findBook.quantity < updatedQuantity) {
        res.status(400).json({
          success: false,
          message: "Insufficient quantity available for updating the order.",
        });
        return;
      }

      existingOrder.quantity = updatedQuantity;
      existingOrder.totalPrice = updatedTotalPrice;
      await existingOrder.save();

      // Update the product quantity in the inventory
      await BookModel.updateOne(
        { _id: product },
        { $inc: { quantity: -quantity } }
      );

      res.status(200).json({
        success: true,
        message: "Order updated successfully.",
        data: existingOrder,
      });
    } else {
      // Create a new order
      const orderData = { email, product, quantity, totalPrice };

      const newOrder = await OrderService.createOrderIntoDB(orderData);

      // Update the product quantity in the inventory
      await BookModel.updateOne(
        { _id: product },
        { $inc: { quantity: -quantity } }
      );

      res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        data: newOrder,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to place the order.",
      error: (error as Error).message || "Unknown error",
    });
  }
};

export const OrdersController = {
  createOrder,
};

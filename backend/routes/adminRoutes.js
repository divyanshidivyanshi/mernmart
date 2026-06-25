import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controller/adminController.js";

const router = express.Router();

// Admin routes
router.get("/orders", getAllOrders);
router.put("/order-status", updateOrderStatus);

export default router;
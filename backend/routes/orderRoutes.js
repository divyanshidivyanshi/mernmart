import express from "express";
import { placeOrder, getUserOrders ,updateOrderStatus, getAllOrders,} from "../controller/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);

// ✅ THIS MUST EXIST
router.get("/user/:userId", getUserOrders);
router.put("/status", updateOrderStatus);
router.get("/all", getAllOrders);

export default router;
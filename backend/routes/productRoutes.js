import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getProducts);
router.delete("/:id", deleteProduct);

export default router;
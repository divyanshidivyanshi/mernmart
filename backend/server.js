import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("MernMart API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use("/api/payment", paymentRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);
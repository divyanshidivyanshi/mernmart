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

// Connect to MongoDB Atlas Database
connectDB();

const app = express();

// Dynamically handle CORS for both local development and Vercel production
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Vercel routing handles)
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.includes("vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Base Health Check Route
app.get("/", (req, res) => {
  res.send("MernMart API Running Successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);

// Local Server Port Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// CRITICAL FOR VERCEL: Export the app instance
export default app;
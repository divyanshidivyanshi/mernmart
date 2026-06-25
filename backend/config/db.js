import mongoose from "mongoose";

const connectDB = async () => {
  // 1. Fail-safe configuration: Fallback if Vercel dashboard environment keys are loading out of sync
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("FATAL ERROR: MONGO_URI environment variable is missing!");
    // In production, don't kill the whole server container right away if it's a cold-start sync issue
    if (process.env.NODE_ENV === "production") return;
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

export default connectDB;
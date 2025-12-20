// BACKEND/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error(" DATABASE not found in .env");
      process.exit(1);
    }

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB CONNECTED");
    });
    await mongoose.connect(`${process.env.MONGO_URL}/shopcase`)
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

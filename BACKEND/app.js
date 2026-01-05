// BACKEND/app.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import cartRouter from "./routes/cart.js";
import authRouter from './routes/auth.js';
import orderRouter from './routes/orders.js';
import errorHandler from './middleware/errorHandler.js';

// App config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// API routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
// Keep singular mount for backward compatibility
app.use('/api/product', productRouter)
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// Health check
app.get('/', (req, res) => {
  res.send("API WORKING");
})

// Centralized error handler - must be last middleware
app.use(errorHandler);

app.listen(port, () => console.log("Server is working on port " + port))
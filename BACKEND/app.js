import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import cartRouter from "./routes/cart.js";
// App config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use("/api/cart", cartRouter);

app.get('/', (req, res) => {
  res.send("API WORKING");
})

app.listen(port, () => console.log("server is working " + port)
)
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import cartModel from '../models/cart.js';

const run = async () => {
  await connectDB();
  const carts = await cartModel.find({}).sort({ createdAt: -1 }).limit(20).lean();
  console.log('Latest carts:', JSON.stringify(carts, null, 2));
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(2); });
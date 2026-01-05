import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import productModel from '../models/product.js';

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/showProduct.js <productId>');
  process.exit(2);
}

const run = async () => {
  await connectDB();
  const p = await productModel.findById(id).lean();
  console.log(JSON.stringify(p, null, 2));
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(2); });
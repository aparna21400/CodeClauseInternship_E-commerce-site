import express from 'express'
import { list, add, remove, singleProductInfo, getProductById, getProductsByCategory } from '../controller/productCon.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();


productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), add);
productRouter.post('/remove',adminAuth, remove);
productRouter.post('/single', singleProductInfo);

// List all products (legacy and root)
productRouter.get('/list', list)
productRouter.get('/', list)

// Get products by category
productRouter.get('/category/:category', getProductsByCategory)

// Get single product by id
productRouter.get('/:productId', getProductById)

export default productRouter;
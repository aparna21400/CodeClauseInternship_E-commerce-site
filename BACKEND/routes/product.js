import express from 'express'
import { list, add, remove, singleProductInfo } from '../controller/productCon.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();


productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), add);
productRouter.post('/remove',adminAuth, remove);
productRouter.post('/single', singleProductInfo);

productRouter.get('/list', list)


export default productRouter;
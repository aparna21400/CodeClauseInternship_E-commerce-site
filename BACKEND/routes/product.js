import express from 'express'
import { list, add, remove, singleProductInfo } from '../controller/productCon.js';
import auth from ('../middleware/auth');
import upload from '../middleware/multer.js';

const productRouter = express.Router();


productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), add);
productRouter.post('/remove', remove);
productRouter.post('/single', singleProductInfo);

productRouter.get('/list', list)

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

// Get single product
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Get product by id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create product (admin only, add auth middleware later)
productRouter.post('/', async (req, res) => {
  try {
    const product = new product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Update product
productRouter.put('/:id', async (req, res) => {
  try {
    const product = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(400).json({ error: err.message });
  }
});

// Delete product
productRouter.delete('/:id', async (req, res) => {
  try {
    const product = await product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(400).json({ error: err.message });
  }
});

export default productRouter;
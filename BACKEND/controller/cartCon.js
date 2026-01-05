// BACKEND/controller/cartCon.js
import cartModel from '../models/cart.js';
import productModel from '../models/product.js';

/**
 * Add item to cart
 * POST /api/cart/add
 * Requires: authentication
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // user document id

    // Accept multiple possible incoming fields from frontend
    let rawProduct = req.body.product || req.body.productId || req.body.id || req.body._id || (req.body.product && req.body.product._id);
    let size = req.body.size || (req.body.product && req.body.product.size);

    // Normalize productId to string if possible
    let productId;
    if (rawProduct && typeof rawProduct === 'object' && rawProduct._id) productId = String(rawProduct._id);
    else if (rawProduct) productId = String(rawProduct);

    // Minimal log for debugging
    console.log('addToCart called for user:', userId, 'product:', productId ? productId : 'missing', 'size:', size ? size : 'missing');

    // Validate input
    const missing = [];
    if (!productId) missing.push('productId');
    if (!size) missing.push('size');
    if (missing.length) {
      return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
    }

    // Validate product exists (using mongoose's findById which accepts string or ObjectId)
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // normalize size key for consistent storage (trimmed)
    const normalizedSize = String(size).trim();
    const normalizedProductSizes = Array.isArray(product.size) ? product.size.map(s => String(s).trim()) : [];

    // Optional: validate size exists in product sizes array (if defined)
    if (normalizedProductSizes.length && !normalizedProductSizes.includes(normalizedSize)) {
      return res.status(400).json({ success: false, message: `Invalid size. Available sizes: ${normalizedProductSizes.join(', ')}` });
    }

    // Atomic update using $inc to avoid races and ensure persistence
    const path = `cartData.${productId}.${normalizedSize}`;
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { $inc: { [path]: 1 }, $setOnInsert: { userId } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    console.log('cart after update (live from DB):', JSON.stringify(updatedCart));

    res.json({ success: true, message: "Added to cart", cartData: updatedCart.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Step 2: Fix removeFromCart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Fixed
    const { productId, size } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const normalizedSize = String(size).trim();
    if (cart.cartData[productId] && cart.cartData[productId][normalizedSize]) {
      cart.cartData[productId][normalizedSize] -= 1;

      if (cart.cartData[productId][normalizedSize] <= 0) {
        delete cart.cartData[productId][normalizedSize];
      }

      if (Object.keys(cart.cartData[productId]).length === 0) {
        delete cart.cartData[productId];
      }
    }

    await cart.save();
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Step 3: Fix getCart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Fixed
    const cart = await cartModel.findOne({ userId });

    res.json({
      success: true,
      cartData: cart ? cart.cartData : {},
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// BACKEND/controller/cartCon.js
import cartModel from '../models/cart.js';

/**
 * Add item to cart
 * POST /api/cart/add
 * Requires: authentication
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Changed from req.userId to req.user.id
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.json({ success: false, message: "Missing data" });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        cartData: {},
      });
    }

    const cartData = cart.cartData;

    if (!cartData[productId]) {
      cartData[productId] = {};
    }

    if (!cartData[productId][size]) {
      cartData[productId][size] = 1;
    } else {
      cartData[productId][size] += 1;
    }

    cart.cartData = cartData;
    await cart.save();

    res.json({ success: true, message: "Added to cart" });
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

    if (cart.cartData[productId] && cart.cartData[productId][size]) {
      cart.cartData[productId][size] -= 1;

      if (cart.cartData[productId][size] <= 0) {
        delete cart.cartData[productId][size];
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
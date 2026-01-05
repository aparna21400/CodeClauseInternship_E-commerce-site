// BACKEND/controller/orderCon.js
import orderModel from '../models/orders.js';
import cartModel from '../models/cart.js';
import productModel from '../models/product.js';

/**
 * Create a new order from cart items
 * POST /api/orders
 * Requires: authentication
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;

    // Validate required fields
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address and payment method are required'
      });
    }

    // Get user's cart
    const cart = await cartModel.findOne({ userId });
    if (!cart || !cart.cartData || Object.keys(cart.cartData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Build order items from cart
    const items = [];
    let subtotal = 0;

    for (const productId in cart.cartData) {
      const product = await productModel.findById(productId);
      if (!product) {
        console.warn(`Product ${productId} not found, skipping`);
        continue;
      }

      for (const size in cart.cartData[productId]) {
        const quantity = cart.cartData[productId][size];
        const itemTotal = product.new_price * quantity;
        
        items.push({
          product: productId,
          size,
          quantity,
          price: product.new_price
        });
        
        subtotal += itemTotal;
      }
    }

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid items in cart'
      });
    }

    // Calculate shipping fee (free for orders over $50, else $5)
    const shippingFee = subtotal >= 50 ? 0 : 5;
    const total = subtotal + shippingFee;

    // Create order
    const order = new orderModel({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      total
    });

    await order.save();

    // Clear cart after successful order
    cart.cartData = {};
    await cart.save();

    // Populate product details for response
    await order.populate('items.product');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
};

/**
 * Get all orders for the authenticated user
 * GET /api/orders
 * Requires: authentication
 */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 }); // Most recent first

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders'
    });
  }
};

/**
 * Get single order by ID
 * GET /api/orders/:orderId
 * Requires: authentication
 */
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel
      .findOne({ _id: orderId, user: userId })
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order'
    });
  }
};

/**
 * Get order by order number
 * GET /api/orders/number/:orderNumber
 * Requires: authentication
 */
export const getOrderByNumber = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderNumber } = req.params;

    const order = await orderModel
      .findOne({ orderNumber, user: userId })
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order by number error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order'
    });
  }
};
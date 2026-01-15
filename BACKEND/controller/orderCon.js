// BACKEND/controller/orderCon.js
import orderModel from '../models/orders.js';
import cartModel from '../models/cart.js';
import productModel from '../models/product.js';


export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { shippingAddress, paymentMethod } = req.body;

    // Validate required fields
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address and payment method required'
      });
    }

    // Validate shipping address fields
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country', 'phone'];
    const missing = requiredFields.filter(f => !shippingAddress[f]?.trim());

    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missing.join(', ')}`
      });
    }

    // Get user's cart
    const cart = await cartModel.findOne({ userId });

    console.log("ORDER userId (from token):", userId);
    console.log("CART userId (stored in DB):", cart?.userId);
    console.log("CART cartData:", cart?.cartData);


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

      if (!product) continue;

      const sizesObj = cart.cartData[productId];

      for (const size in sizesObj) {
        const quantity = parseInt(sizesObj[size], 10);

        if (!Number.isInteger(quantity) || quantity <= 0) {
          return res.status(400).json({
            success: false,
            message: `Invalid quantity for product ${productId}`
          });
        }

        items.push({
          product: productId,
          size,
          quantity,
          price: product.new_price
        });

        subtotal += product.new_price * quantity;
      }
    }

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid items in cart'
      });
    }

    // Calculate shipping (free over $50)
    const shippingFee = subtotal >= 50 ? 0 : 5;
    const total = subtotal + shippingFee;

    // Create order
    const order = new orderModel({
      user: userId,
      items,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        zipCode: shippingAddress.zipCode.trim(),
        country: shippingAddress.country.trim(),
        phone: shippingAddress.phone.trim()
      },
      paymentMethod,
      subtotal,
      shippingFee,
      total
    });

    await order.save();

    // Clear cart
    cart.cartData = {};
    await cart.save();

    // Populate product details
    await order.populate('items.product');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('Create order error:', error);
    next(error);
  }
};

/**
 * Get all orders for authenticated user
 * GET /api/orders
 */
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.error('Get orders error:', error);
    next(error);
  }
};

/**
 * Get single order by ID
 * GET /api/orders/:orderId
 */
export const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await orderModel.findOne({ _id: orderId, user: userId }).populate('items.product');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, order });

  } catch (error) {
    console.error('Get order error:', error);
    next(error);
  }
};

/**
 * Get all orders (Admin only)
 * GET /api/orders/admin
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find({})
      .populate('items.product')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.error('Get all orders error:', error);
    next(error);
  }
};
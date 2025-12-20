const express = require('express');
const Order = require('../models/orders');
const auth = require('../middleware/auth');

const router = express.Router();

// Create order (from cart)
router.post('/', auth, async (req, res) => {
  const { products, total } = req.body;
  const order = new Order({ user: req.user.id, products, total });
  await order.save();
  res.status(201).json(order);
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('products.product');
  res.json(orders);
});

module.exports = router;
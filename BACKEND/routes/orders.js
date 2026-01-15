// BACKEND/routes/orders.js
import express from 'express';
import { createOrder, getUserOrders, getOrderById, getAllOrders } from '../controller/orderCon.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// User routes (require authentication)
orderRouter.post('/', auth, createOrder);
orderRouter.get('/', auth, getUserOrders);
orderRouter.get('/:orderId', auth, getOrderById);

// Admin routes
orderRouter.get('/admin/all', adminAuth, getAllOrders);

export default orderRouter;
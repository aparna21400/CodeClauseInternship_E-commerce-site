// BACKEND/routes/orders.js
import express from 'express';
import { createOrder, getUserOrders, getOrderById, getOrderByNumber } from '../controller/orderCon.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

// All order routes require authentication
orderRouter.post('/', auth, createOrder);
orderRouter.get('/', auth, getUserOrders);
orderRouter.get('/:orderId', auth, getOrderById);
orderRouter.get('/number/:orderNumber', auth, getOrderByNumber);

export default orderRouter;
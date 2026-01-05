// BACKEND/routes/orders.js
import express from 'express';
import { createOrder, getUserOrders, getOrderById, getOrderByNumber } from '../controller/orderCon.js';
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

// Enforce authentication for all order routes
orderRouter.use(auth);

orderRouter.post('/', createOrder);
orderRouter.get('/', getUserOrders);
orderRouter.get('/:orderId', getOrderById);
orderRouter.get('/number/:orderNumber', getOrderByNumber);

export default orderRouter;
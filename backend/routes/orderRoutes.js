import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderStatus,
    createRazorpayOrder,
    verifyRazorpayPayment
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

// Payment routes
router.route('/payment/create').post(protect, createRazorpayOrder);
router.route('/payment/verify').post(protect, verifyRazorpayPayment);

export default router;

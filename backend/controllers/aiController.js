import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// @desc    Get similar products via AI
// @route   GET /api/products/:id/similar
// @access  Public
export const getSimilarProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select('_id name category brand description');

        // Format for Python AI service
        const allProducts = products.map(p => ({
            product_id: p._id.toString(),
            name: p.name,
            category: p.category,
            brand: p.brand,
            description: p.description
        }));

        try {
            const response = await axios.post(`${AI_SERVICE_URL}/api/ai/similar-products`, {
                product_id: req.params.id,
                all_products: allProducts,
                limit: 4
            });

            const recommendationIds = response.data.recommendations;

            // Fetch full product details for recommended IDs
            const recommendedProducts = await Product.find({
                '_id': { $in: recommendationIds }
            });

            res.json(recommendedProducts);
        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            res.status(503).json({ message: 'AI Recommendation Service unavailable' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Customers Also Bought via AI
// @route   GET /api/products/:id/also-bought
// @access  Public
export const getCustomersAlsoBought = async (req, res) => {
    try {
        const orders = await Order.find({ 'orderItems.product': req.params.id }).select('_id user orderItems');

        if (orders.length === 0) {
            return res.json([]);
        }

        const allOrders = orders.map(o => ({
            order_id: o._id.toString(),
            user_id: o.user.toString(),
            product_ids: o.orderItems.map(item => item.product.toString())
        }));

        try {
            const response = await axios.post(`${AI_SERVICE_URL}/api/ai/customers-also-bought`, {
                product_id: req.params.id,
                all_orders: allOrders,
                limit: 4
            });

            const recommendationIds = response.data.recommendations;

            const recommendedProducts = await Product.find({
                '_id': { $in: recommendationIds }
            });

            res.json(recommendedProducts);
        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            res.status(503).json({ message: 'AI Recommendation Service unavailable' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Trending Products via AI
// @route   GET /api/products/ai/trending
// @access  Public
export const getTrendingProducts = async (req, res) => {
    try {
        try {
            const response = await axios.get(`${AI_SERVICE_URL}/api/ai/trending`);
            const recommendationIds = response.data.trending;

            const trendingProducts = await Product.find({
                '_id': { $in: recommendationIds }
            });

            res.json(trendingProducts);
        } catch (aiError) {
            console.error('AI Service Error:', aiError.message);
            // Fallback: Return top rated or most reviewed if AI fails
            const fallbackProducts = await Product.find({}).sort({ rating: -1, numReviews: -1 }).limit(4);
            res.json(fallbackProducts);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

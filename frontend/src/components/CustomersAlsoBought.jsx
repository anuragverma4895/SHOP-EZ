import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import axios from 'axios';

const AIProductCard = ({ product }) => (
    <Link to={`/product/${product._id}`} className="block">
        <motion.div
            whileHover={{ y: -5 }}
            className="min-w-[240px] max-w-[240px] bg-white rounded-xl shadow-sm border border-gray-100 p-4 shrink-0 group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                    className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-blue-600"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent navigating to product page when clicking cart
                        // addToCart logic would go here
                    }}
                >
                    <ShoppingCart className="w-4 h-4" />
                </button>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-gray-100">
                <img src={product.image || (product.images && product.images[0])} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex items-center space-x-1 mb-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700">{product.rating || "4.5"}</span>
            </div>
            <h3 className="font-medium text-gray-900 text-sm truncate mb-1 hover:text-blue-600">
                {product.name}
            </h3>
            <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">₹{product.price || product.discountPrice}</span>
            </div>
        </motion.div>
    </Link>
);

const CustomersAlsoBought = ({ productId }) => {
    const [alsoBoughtProducts, setAlsoBoughtProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCollab = async () => {
            try {
                // Need auth token for orders API
                const userInfo = localStorage.getItem('userInfo');
                const config = userInfo ? {
                    headers: { Authorization: `Bearer ${JSON.parse(userInfo).token}` }
                } : {};

                // Get all orders and products
                const [{ data: orderData }, { data: productData }] = await Promise.all([
                    axios.get('/api/orders', config).catch(() => ({ data: [] })), // Allow failure if not admin
                    axios.get('/api/products?page=1')
                ]);

                // Construct fake order history if API fails/empty for demo purposes, else use real
                let ordersList = orderData;
                if (!ordersList || ordersList.length === 0) {
                    // Provide some synthetic order data for AI to chew on if db is empty
                    ordersList = [
                        { _id: 'o1', user: 'u1', orderItems: [{ product: productId }, { product: productData.products[0]?._id }] }
                    ];
                }

                const payload = {
                    product_id: productId,
                    all_orders: ordersList.map(o => ({
                        order_id: o._id,
                        user_id: o.user?._id || o.user || 'anonymous',
                        product_ids: (o.orderItems || []).map(item => item.product?._id || item.product).filter(Boolean)
                    })),
                    limit: 4
                };

                const aiResponse = await axios.post('/api/ai/customers-also-bought', payload);

                const recommendedIds = aiResponse.data.recommendations || [];
                const finalProducts = productData.products.filter(p => recommendedIds.includes(p._id));

                setAlsoBoughtProducts(finalProducts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch collaborative products:", error);
                setLoading(false);
            }
        };

        if (productId) {
            fetchCollab();
        }
    }, [productId]);

    if (loading) return <div className="text-gray-500 text-sm">Loading recommendations...</div>;
    if (alsoBoughtProducts.length === 0) return <div className="text-gray-500 text-sm">No recommendations generated yet.</div>;

    return (
        <div className="flex overflow-x-auto gap-4 pb-6 pt-2 snap-x hide-scroll-bar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {alsoBoughtProducts.map((p, i) => (
                <motion.div key={p._id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="snap-start">
                    <AIProductCard product={p} />
                </motion.div>
            ))}
        </div>
    );
};

export default CustomersAlsoBought;

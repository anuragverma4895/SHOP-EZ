import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, XCircle, ChevronRight, Download } from 'lucide-react';

const mockOrders = [
    {
        _id: "ORD-987654321",
        createdAt: "2026-03-01T10:00:00Z",
        totalPrice: 428.00,
        isPaid: true,
        paidAt: "2026-03-01T10:05:00Z",
        isDelivered: true,
        deliveredAt: "2026-03-04T14:30:00Z",
        orderStatus: "Delivered",
        orderItems: [
            { name: "Sony Headphones", qty: 1, price: 199.00, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
            { name: "Premium Leather Backpack", qty: 1, price: 129.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
        ]
    },
    {
        _id: "ORD-123456789",
        createdAt: "2026-03-05T16:20:00Z",
        totalPrice: 799.00,
        isPaid: true,
        paidAt: "2026-03-05T16:25:00Z",
        isDelivered: false,
        orderStatus: "Processing",
        orderItems: [
            { name: "Samsung 4K Smart TV", qty: 1, price: 799.00, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
        ]
    }
];

const OrderHistoryPage = () => {

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'Processing': return <Clock className="w-5 h-5 text-blue-500" />;
            case 'Cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
            default: return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Orders</h1>
                        <p className="text-gray-500 mt-2">Track, return, or buy things again</p>
                    </div>
                </div>

                {mockOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                        <p className="text-gray-500 mt-2 mb-6">Looks like you haven't placed an order yet.</p>
                        <Link to="/products" className="bg-blue-600 text-white font-medium py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-colors inline-block">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {mockOrders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                                    <div className="flex flex-wrap items-center gap-6 sm:gap-12">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order Placed</p>
                                            <p className="text-sm font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="text-sm font-medium text-gray-900">₹{order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order #</p>
                                            <p className="text-sm font-medium text-blue-600">{order._id}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                                            <Download className="w-4 h-4" />
                                            <span>Invoice</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Order Body */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(order.orderStatus)}
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                        {order.isDelivered && (
                                            <p className="text-sm text-gray-500 font-medium">
                                                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row gap-6">
                                                <div className="w-full sm:w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <Link to="#" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                                                        {item.name}
                                                    </Link>
                                                    <p className="text-sm text-gray-500 mt-1">Qty: {item.qty} • ₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center sm:justify-end">
                                                    <button className="text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-colors w-full sm:w-auto text-center">
                                                        Buy it again
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Order Footer */}
                                <div className="bg-gray-50 px-6 py-3 flex items-center justify-end border-t border-gray-100">
                                    <Link to={`/order/${order._id}`} className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                        View order details
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;

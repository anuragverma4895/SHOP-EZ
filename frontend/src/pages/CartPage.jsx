import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, updateQty, removeFromCart } = useCart();
    const navigate = useNavigate();

    const removeItem = (product, size) => {
        removeFromCart(product, size);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const finalPrice = cartItems.reduce((acc, item) => acc + ((item.discountPrice || item.price) * item.qty), 0);
    const discount = subtotal - finalPrice;

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center border border-gray-100 min-h-[50vh]">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-12 h-12 text-indigo-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart yet. Explore our products and discover great deals.
                        </p>
                        <Link to="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-colors inline-block">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div
                                        key={`${item.product}-${item.size}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 relative"
                                    >
                                        <div className="w-full sm:w-32 h-32 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2 pr-8">
                                                <div>
                                                    <Link to={`/product/${item.product}`}>
                                                        <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">{item.name}</h3>
                                                    </Link>
                                                    {item.size && <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>}
                                                </div>
                                            </div>

                                            <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg font-bold text-gray-900">₹{item.discountPrice || item.price}</span>
                                                    {item.discountPrice && item.discountPrice < item.price && (
                                                        <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                                    )}
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                                        <button
                                                            onClick={() => updateQty(item.product, item.size, item.qty - 1)}
                                                            className="p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                                            disabled={item.qty <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center font-medium text-gray-900 text-sm">{item.qty}</span>
                                                        <button
                                                            onClick={() => updateQty(item.product, item.size, item.qty + 1)}
                                                            className="p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.product, item.size)}
                                            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 sticky top-28">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>
                                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span className="font-medium">-₹{discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Charges</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-8">
                                    <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                        <span>Total Amount</span>
                                        <span>₹{finalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 flex justify-center items-center space-x-2 hover:bg-indigo-700 transition duration-300"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;

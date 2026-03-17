import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, MapPin, User, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('Razorpay');
    const [shipping, setShipping] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: ''
    });

    const { user } = useAuth();
    const { cartItems, clearCart } = useCart();
    const itemsPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shippingPrice = itemsPrice > 100 || itemsPrice === 0 ? 0 : 15.00;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleInputChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to place an order");
            navigate('/login');
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            navigate('/products');
            return;
        }

        // Simulate API call for now since we haven't wired up the full backend orders route with Razorpay yet
        toast.success(`Order placed successfully via ${paymentMethod}!`);
        clearCart();
        navigate('/orders');
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">

                        {/* Shipping Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
                                <MapPin className="w-6 h-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                            </div>

                            <form id="checkout-form" onSubmit={placeOrderHandler} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={shipping.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                                placeholder="John Doe"
                                            />
                                            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="phone"
                                                value={shipping.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                                placeholder="+1 (234) 567-890"
                                            />
                                            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={shipping.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        placeholder="Street address, apartment, suite, etc."
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shipping.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={shipping.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            placeholder="NY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shipping.postalCode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>
                            </form>
                        </motion.div>

                        {/* Payment Options */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'Razorpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="Razorpay"
                                            checked={paymentMethod === 'Razorpay'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="font-medium text-gray-900">Credit Card / UPI / NetBanking (Razorpay)</span>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1024px-Razorpay_logo.svg.png" alt="Razorpay" className="h-4 object-contain" />
                                </label>

                                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <span className="font-medium text-gray-900">Cash on Delivery</span>
                                    </div>
                                    <Truck className="w-6 h-6 text-gray-400" />
                                </label>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 sticky top-28"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                                        <span className="text-gray-600 truncate mr-4">{item.qty}x {item.name}</span>
                                        <span className="font-medium text-gray-900 shrink-0">₹{(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{itemsPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes</span>
                                    <span className="font-medium">₹{taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toFixed(2)}`}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-8">
                                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-blue-600">₹{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                form="checkout-form"
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 flex justify-center items-center space-x-2 hover:bg-blue-700 transition duration-300"
                            >
                                <ShieldCheck className="w-5 h-5" />
                                <span>Place Order</span>
                            </motion.button>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                By placing your order you agree to our Terms & Conditions, privacy and returns policies .
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

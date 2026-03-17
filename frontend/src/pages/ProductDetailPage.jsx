import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import SimilarProducts from '../components/SimilarProducts';
import CustomersAlsoBought from '../components/CustomersAlsoBought';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { allDummyProducts } from '../data/dummyProducts';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart } = useCart();
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Check local dummy dictionary first to support UI tests
                const dummyProduct = allDummyProducts.find(p => p._id === id || p.id === parseInt(id));
                if (dummyProduct) {
                    setProduct(dummyProduct);
                    setMainImage(dummyProduct.image || (dummyProduct.images && dummyProduct.images[0]) || '');
                    setLoading(false);
                    return;
                }

                // Fallback to API
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setMainImage(data.image || (data.images && data.images[0]) || '');
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : "Product not found. Please ensure backend is running or use a valid product ID.");
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">Loading product details...</div>;
    if (error) return <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center text-red-500"><p className="text-xl font-bold mb-4">{error}</p><Link to="/" className="text-blue-600 underline">Go Back Home</Link></div>;
    if (!product) return null;

    // Provide default images/sizes if backend model only has single image
    const images = product.images || [product.image];
    const sizes = product.sizes || ['S', 'M', 'L', 'XL'];



    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="flex text-sm text-gray-500 mb-8 space-x-2">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-blue-600 transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="text-gray-900 truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200"
                        >
                            <motion.img
                                key={mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                            {product.name}
                        </h1>
                        <p className="text-blue-600 font-medium tracking-wide uppercase text-sm mb-4">{product.brand}</p>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-600">{product.rating} Rating</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm text-gray-600 underline hover:text-blue-600 cursor-pointer">{product.numReviews} Reviews</span>
                        </div>

                        <div className="mb-6 flex items-end space-x-3">
                            <span className="text-4xl font-extrabold text-gray-900">₹{product.discountPrice || product.price}</span>
                            {product.discountPrice < product.price && (
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xl text-gray-400 line-through mb-1">₹{product.price}</span>
                                    <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded mb-1">Save ₹{Math.round(product.price - product.discountPrice)}</span>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="mb-8 border-t border-b border-gray-100 py-6">

                            {/* Size Selector */}
                            {sizes && sizes.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                                        <span className="text-sm text-blue-600 hover:underline cursor-pointer">Size Guide</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-medium transition-all ${selectedSize === size
                                                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 ring-offset-1'
                                                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mb-2">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-max">
                                        <button
                                            onClick={() => setQty(q => Math.max(1, q - 1))}
                                            className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium text-gray-900">{qty}</span>
                                        <button
                                            onClick={() => setQty(q => Math.min(product.countInStock, q + 1))}
                                            className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {product.countInStock > 0 ? (
                                            <span className="text-green-600 font-medium">In Stock ({product.countInStock} available)</span>
                                        ) : (
                                            <span className="text-red-500 font-medium">Out of Stock</span>
                                        )}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={product.countInStock === 0}
                                onClick={() => addToCart({ _id: product._id, name: product.name, price: product.discountPrice || product.price, image: images[0] }, qty, selectedSize)}
                                className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 flex justify-center items-center space-x-2 hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:shadow-none"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>Add to Cart</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold flex justify-center items-center space-x-2 hover:border-blue-600 hover:text-blue-600 transition duration-300 bg-white"
                            >
                                <Heart className="w-5 h-5" />
                                <span className="hidden sm:inline">Wishlist</span>
                            </motion.button>
                        </div>

                        {/* Delivery Info Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-2xl">
                            <div className="flex flex-col items-center text-center">
                                <Truck className="w-6 h-6 text-blue-600 mb-2" />
                                <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                                <p className="text-xs text-gray-500 mt-1">Orders over ₹500</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <RotateCcw className="w-6 h-6 text-blue-600 mb-2" />
                                <h4 className="font-semibold text-gray-900 text-sm">30-Day Return</h4>
                                <p className="text-xs text-gray-500 mt-1">Money back guarantee</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
                                <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
                                <p className="text-xs text-gray-500 mt-1">100% secure checkout</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* AI Sections Placeholders for Phase 6 */}
                <div className="mt-24 border-t border-gray-100 pt-16">
                    <div className="flex items-center space-x-2 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white uppercase tracking-wider">AI Powered</span>
                    </div>
                    <SimilarProducts productId={product._id} />
                </div>

                <div className="mt-16">
                    <div className="flex items-center space-x-2 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Customers Also Bought</h2>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white uppercase tracking-wider">AI Powered</span>
                    </div>
                    <CustomersAlsoBought productId={product._id} />
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = [
    {
        id: 1,
        name: 'Sony Noise Cancelling Headphones',
        price: 299,
        discountPrice: 199,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Apple Watch Series 9',
        price: 399,
        discountPrice: 349,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Mobiles'
    },
    {
        id: 3,
        name: 'Premium Leather Backpack',
        price: 129,
        discountPrice: 89,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Fashion'
    },
    {
        id: 4,
        name: 'Minimalist Desk Lamp',
        price: 79,
        discountPrice: 49,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Home'
    }
];

const FeaturedProducts = () => {
    const { addToCart } = useCart();

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="mt-2 text-gray-500">Handpicked items just for you</p>
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
                        >
                            <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100 block group-hover:cursor-pointer">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        Sale
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                    <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </Link>

                            <div className="p-5">
                                <div className="flex items-center space-x-1 mb-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                                </div>
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="font-semibold text-gray-900 truncate mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
                                </Link>
                                <p className="text-sm text-gray-500 mb-4">{product.category}</p>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xl font-bold text-gray-900">₹{product.discountPrice}</span>
                                        <span className="text-sm text-gray-400 line-through ml-2">₹{product.price}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.preventDefault(); addToCart(product, 1, 'Standard'); }}
                                        className="bg-gray-900 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;

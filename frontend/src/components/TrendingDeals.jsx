import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const deals = [
    { id: 1, name: 'Samsung 4K Smart TV', price: 499, original: 799, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Nike Air Max 2024', price: 129, original: 189, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Apple iPad Pro', price: 799, original: 999, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Smart Home Hub', price: 49, original: 99, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Gaming Chair Elite', price: 199, original: 299, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
];

const TrendingDeals = () => {
    const sliderRef = useRef(null);
    const { addToCart } = useCart();

    const slideLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const slideRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <section className="py-16 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            Trending Deals <span className="text-2xl">⚡</span>
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={slideLeft} className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-600 transition">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={slideRight} className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-600 transition">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scroll-bar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {deals.map(deal => (
                        <motion.div
                            key={deal.id}
                            whileHover={{ y: -10 }}
                            className="min-w-[280px] max-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 snap-start relative group"
                        >
                            <div className="absolute top-4 left-4 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                -{Math.round(((deal.original - deal.price) / deal.original) * 100)}%
                            </div>
                            <Link to={`/product/${deal.id}`}>
                                <img
                                    src={deal.image}
                                    alt={deal.name}
                                    className="w-full h-48 object-cover rounded-xl mb-4"
                                />
                                <h3 className="font-semibold text-gray-900 truncate mb-2 hover:text-blue-600 transition-colors">{deal.name}</h3>
                            </Link>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl font-bold text-red-600">₹{deal.price}</span>
                                <span className="text-sm text-gray-400 line-through">₹{deal.original}</span>
                            </div>
                            <button
                                onClick={() => addToCart({ _id: deal.id, name: deal.name, price: deal.price, image: deal.image }, 1, 'Standard')}
                                className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" /> Add to cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingDeals;

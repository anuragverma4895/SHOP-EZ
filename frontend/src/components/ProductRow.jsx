import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductRow = ({ title, subtitle, products, bgColor = 'bg-white', headerBg = '' }) => {
    const sliderRef = useRef(null);
    const { addToCart } = useCart();

    const slideLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const slideRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const isDark = headerBg && (headerBg.includes('bg-slate-9') || headerBg.includes('bg-gray-9') || headerBg.includes('bg-black'));

    return (
        <section className={`py-3 ${bgColor} max-w-7xl mx-auto px-2 sm:px-4 lg:px-8`}>
            <div className={`rounded-md shadow-sm border border-gray-100 overflow-hidden bg-white`}>
                <div className={`px-4 sm:px-6 py-4 flex items-center justify-between ${headerBg || 'bg-white border-b border-gray-100'}`}>
                    <div>
                        <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2 tracking-tight`}>
                            {title}
                        </h2>
                        {subtitle && <p className={`text-sm ${isDark ? 'text-white/90' : 'text-gray-500'} mt-0.5 font-medium`}>{subtitle}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={slideLeft} className={`p-1.5 rounded-full ${isDark ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'} transition shadow-sm`}>
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={slideRight} className={`p-1.5 rounded-full ${isDark ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'} transition shadow-sm`}>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-4 p-4 pb-6 snap-x snap-mandatory hide-scroll-bar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map(deal => (
                        <motion.div
                            key={deal.id}
                            whileHover={{ y: -4 }}
                            className="min-w-[160px] sm:min-w-[200px] max-w-[160px] sm:max-w-[200px] rounded-lg border border-gray-100 p-3 snap-start relative group hover:shadow-md bg-white transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <Link to={`/product/${deal.id}`}>
                                <div className="bg-gray-50 rounded-lg p-2 mb-3 h-32 sm:h-40 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={deal.image}
                                        alt={deal.name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors">{deal.name}</h3>
                                {deal.offer && <p className="text-[11px] sm:text-xs font-bold text-green-600 mb-1">{deal.offer}</p>}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm sm:text-base font-bold text-gray-900">₹{deal.price}</span>
                                    {deal.original && <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{deal.original}</span>}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style jsx="true">{`
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default ProductRow;

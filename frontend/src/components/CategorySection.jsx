import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, MonitorPlay, Shirt, Home, Dumbbell, Sparkles, Plane, Tv, Sofa, Baby } from 'lucide-react';

const categories = [
    { id: 1, name: 'For You', icon: Sparkles },
    { id: 2, name: 'Fashion', icon: Shirt },
    { id: 3, name: 'Mobiles', icon: Smartphone },
    { id: 4, name: 'Beauty', icon: Sparkles },
    { id: 5, name: 'Electronics', icon: MonitorPlay },
    { id: 6, name: 'Home', icon: Home },
    { id: 7, name: 'Appliances', icon: Tv },
    { id: 8, name: 'Toys & Baby', icon: Baby },
    { id: 9, name: 'Sports', icon: Dumbbell },
    { id: 10, name: 'Furniture', icon: Sofa },
];

const CategorySection = () => {
    return (
        <section className="bg-white border-b border-gray-100 shadow-sm py-3 mt-[72px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center overflow-x-auto hide-scroll-bar space-x-4 sm:space-x-8 pb-1 pt-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                to={`/products?category=${encodeURIComponent(category.name)}`}
                                key={category.id}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center justify-center cursor-pointer min-w-[64px] group"
                                >
                                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-1 group-hover:bg-indigo-50 transition-colors">
                                        <Icon className="w-6 h-6 text-indigo-600 transition-colors" />
                                    </div>
                                    <span className="text-[13px] font-medium text-gray-800 text-center whitespace-nowrap group-hover:text-indigo-600 transition-colors">{category.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
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

export default CategorySection;

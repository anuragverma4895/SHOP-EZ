import React from 'react';
import { motion } from 'framer-motion';

const BannerSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Banner 1 */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-3xl overflow-hidden h-64 shadow-lg group cursor-pointer"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Holiday Sale"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex flex-col justify-center p-8">
                            <span className="text-orange-400 font-bold tracking-wider mb-2 text-sm uppercase">Limited Time</span>
                            <h3 className="text-3xl font-bold text-white mb-2">Holiday Sale</h3>
                            <p className="text-gray-200 mb-4">Get an extra 20% off on electronics</p>
                            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold w-max hover:bg-gray-100 transition-colors">
                                Shop Now
                            </button>
                        </div>
                    </motion.div>

                    {/* Banner 2 */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-3xl overflow-hidden h-64 shadow-lg group cursor-pointer"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="New Arrivals"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/80 to-transparent flex flex-col justify-center items-end p-8 text-right">
                            <span className="text-blue-300 font-bold tracking-wider mb-2 text-sm uppercase">Spring 2026</span>
                            <h3 className="text-3xl font-bold text-white mb-2">New Arrivals</h3>
                            <p className="text-gray-200 mb-4 text-right">Discover the latest fashion trends</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold w-max hover:bg-blue-700 transition-colors">
                                Explore Collection
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default BannerSection;

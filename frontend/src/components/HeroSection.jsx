import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axios.get('/api/banners/active');
                if (data && data.length > 0) {
                    setBanners(data);
                }
            } catch (error) {
                console.error('Failed to fetch banners', error);
            }
        };
        fetchBanners();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (banners.length === 0) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length, currentIndex]);

    if (banners.length === 0) return null;

    return (
        <div className="relative w-full bg-gray-100 pb-4 pt-4">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 group relative">
                {/* Banner Container */}
                <div className="relative h-[200px] sm:h-[300px] md:h-[380px] w-full bg-white shadow-sm overflow-hidden" style={{ borderRadius: '0' }}>
                    <AnimatePresence initial={false} mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={banners[currentIndex].image}
                            alt={banners[currentIndex].title}
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Dark gradient overlay for modern look */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-24 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <ChevronLeft className="w-8 h-8 text-gray-800" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-24 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <ChevronRight className="w-8 h-8 text-gray-800" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-indigo-600 w-8' : 'bg-white/80 hover:bg-white w-2.5'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

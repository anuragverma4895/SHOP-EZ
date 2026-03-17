import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import BannerSection from '../components/BannerSection';
import ProductRow from '../components/ProductRow';
import axios from 'axios';
import { allDummyProducts } from '../data/dummyProducts';
import { Sparkles, Zap, Star, TrendingUp, Package } from 'lucide-react';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch recent products from API
                const { data } = await axios.get('/api/products?page=1&sort=newest');

                // Map API products for ProductRow compatibility
                const liveProducts = data.products.map(p => ({
                    ...p,
                    id: p._id,
                    original: p.price,
                    price: p.discountPrice || p.price,
                    offer: p.discountPrice && p.discountPrice < p.price
                        ? `${Math.round(((p.price - p.discountPrice) / p.price) * 100)}% Off`
                        : '',
                    image: p.image
                }));

                // Combine live products with dummy products for a full homepage
                setProducts([...liveProducts, ...allDummyProducts]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products', error);
                setProducts(allDummyProducts);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Helper to safely slice products
    const getSlice = (start, end) => products.slice(start, end).length > 0 ? products.slice(start, end) : allDummyProducts.slice(start, end);

    return (
        <div className="bg-slate-50 min-h-screen pb-16 font-sans antialiased">
            <CategorySection />
            <HeroSection />

            {!loading ? (
                <div className="space-y-4 mt-4 max-w-[1400px] mx-auto">
                    {/* AI Recommendation System */}
                    <ProductRow
                        title={<span className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-600" /> AI Recommended For You</span>}
                        subtitle="Personalized smart picks curated just for your unique style"
                        products={getSlice(0, 8)}
                        bgColor="bg-transparent"
                        headerBg="bg-white border-b border-slate-100"
                    />

                    {/* Promotional Banners */}
                    <BannerSection />

                    {/* Trending Products */}
                    <ProductRow
                        title={<span className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-600" /> Trending Now</span>}
                        subtitle="Most popular products our customers love right now"
                        products={getSlice(8, 16)}
                        bgColor="bg-transparent"
                        headerBg="bg-white border-b border-slate-100"
                    />

                    {/* All Products */}
                    <ProductRow
                        title={<span className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-500" /> Top Rated Products</span>}
                        subtitle="Explore our highest-rated items across all categories"
                        products={getSlice(4, 12)}
                        bgColor="bg-transparent"
                        headerBg="bg-white border-b border-slate-100"
                    />

                    {/* Flash Deals with dark header */}
                    <ProductRow
                        title={<span className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Flash Deals</span>}
                        subtitle="Grab these limited-time offers before they vanish!"
                        products={getSlice(12, 20)}
                        bgColor="bg-transparent"
                        headerBg="bg-slate-900 border-b border-slate-800"
                    />

                    {/* More Products */}
                    <ProductRow
                        title={<span className="flex items-center gap-2"><Package className="w-5 h-5 text-blue-600" /> Best in Electronics</span>}
                        subtitle="Top electronics picks for tech enthusiasts"
                        products={getSlice(0, 6)}
                        bgColor="bg-transparent"
                        headerBg="bg-white border-b border-slate-100"
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center h-64 mt-12 bg-slate-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <p className="text-gray-500 text-sm font-medium">Loading amazing products...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;

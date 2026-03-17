import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Star, ShoppingCart, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { allDummyProducts } from '../data/dummyProducts';



const categoriesList = ['All', 'Electronics', 'Fashion', 'Mobiles', 'Home', 'Sports'];
const sortOptions = ['Newest', 'Popular', 'Price: Low to High', 'Price: High to Low'];

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');

    const [searchTerm, setSearchTerm] = useState(urlSearch || '');
    const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
    const [selectedSort, setSelectedSort] = useState('Newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { addToCart } = useCart();

    // Update state if URL changes
    useEffect(() => {
        if (urlCategory) setSelectedCategory(urlCategory);
        if (urlSearch) setSearchTerm(urlSearch);
    }, [urlCategory, urlSearch]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products?page=1');

                const liveProducts = data.products.map(p => ({
                    ...p,
                    rating: p.rating || 4.5,
                    discountPrice: p.price,
                    price: p.price + 50,
                    image: p.image || (p.images && p.images[0])
                }));

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

    // Simplified filtering for UI demo
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                        <p className="text-gray-500 mt-1">Showing {filteredProducts.length} results</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="md:hidden flex items-center justify-center p-2 rounded-lg border border-gray-300 bg-white"
                        >
                            <Filter className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className={`w-full md:w-64 shrink-0 transition-all ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3 uppercase tracking-wider text-sm">Categories</h3>
                                <div className="space-y-2">
                                    {categoriesList.map(category => (
                                        <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === category}
                                                onChange={() => setSelectedCategory(category)}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
                                            <span className={`text-sm transition-colors ${selectedCategory === category ? 'text-indigo-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                                {category}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3 uppercase tracking-wider text-sm">Sort By</h3>
                                <div className="relative">
                                    <select
                                        value={selectedSort}
                                        onChange={(e) => setSelectedSort(e.target.value)}
                                        className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm"
                                    >
                                        {sortOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 uppercase tracking-wider text-sm">Price Range</h3>
                                <div className="flex items-center space-x-2">
                                    <input type="number" placeholder="Min" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                                    <span className="text-gray-400">-</span>
                                    <input type="number" placeholder="Max" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                    className="mt-4 text-indigo-600 font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product, index) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col"
                                        >
                                            <Link to={`/product/${product._id}`} className="relative aspect-square overflow-hidden bg-gray-100 block shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {product.discountPrice < product.price && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                            Sale
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                                    <button
                                                        className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-red-500 hover:bg-gray-50 transition-colors"
                                                        onClick={(e) => { e.preventDefault(); /* Add to wishlist logic */ }}
                                                    >
                                                        <Heart className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </Link>

                                            <div className="p-5 flex flex-col flex-grow">
                                                <div className="flex items-center space-x-1 mb-2">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                                                </div>
                                                <Link to={`/product/${product._id}`}>
                                                    <h3 className="font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors line-clamp-2">{product.name}</h3>
                                                </Link>
                                                <p className="text-xs text-gray-400 mb-4 uppercase tracking-wide">{product.brand}</p>

                                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                                    <div>
                                                        <span className="text-lg font-bold text-gray-900">₹{product.discountPrice || product.price}</span>
                                                        {product.discountPrice < product.price && (
                                                            <span className="text-xs text-gray-400 line-through ml-2">₹{product.price}</span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); addToCart({ _id: product._id, name: product.name, price: product.discountPrice || product.price, image: product.image }, 1, 'Standard'); }}
                                                        className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                                                    >
                                                        <ShoppingCart className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                                        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">1</button>
                                        <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
                                        <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
                                        <span className="px-2 text-gray-500">...</span>
                                        <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Next</button>
                                    </nav>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;

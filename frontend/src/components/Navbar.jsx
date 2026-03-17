import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchKeyword.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchKeyword)}`);
                setSearchKeyword('');
                setIsMobileMenuOpen(false); // Close mobile menu if open
            } else {
                navigate('/products');
                setIsMobileMenuOpen(false);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        // Scroll listener removed as Navbar is now solid
    }, []);

    return (
        <nav className="fixed w-full z-50 bg-indigo-600 shadow-md py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl font-black tracking-tighter text-white"
                        >
                            ShopEZ
                        </motion.span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search Electronics, Fashion, Mobiles, etc..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={handleSearch}
                                className="w-full pl-4 pr-10 py-2 rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-900"
                            />
                            <Search
                                className="absolute right-3 top-2.5 h-5 w-5 text-indigo-600 cursor-pointer"
                                onClick={(e) => handleSearch(e)}
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-6 text-white text-sm font-medium">
                                <Link to={user.isAdmin ? "/admin" : "/profile"} className="hover:text-indigo-200 transition-colors">
                                    {user.name}
                                </Link>
                                <button onClick={handleLogout} className="hover:text-indigo-200 transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-white text-sm font-medium hover:text-indigo-200 transition-colors">
                                Login
                            </Link>
                        )}

                        <Link to="/cart" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                            <span className="text-sm font-medium hidden lg:block">Cart</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white shadow-xl absolute w-full"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            <div className="relative w-full mt-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={(e) => handleSearch(e)}
                                />
                            </div>
                            <div className="flex flex-col space-y-4 mt-4">
                                <Link to="/wishlist" className="flex items-center space-x-3 text-gray-700 font-medium">
                                    <Heart className="h-5 w-5 text-gray-500" />
                                    <span>Wishlist</span>
                                </Link>
                                <Link to="/cart" className="flex items-center space-x-3 text-gray-700 font-medium">
                                    <ShoppingCart className="h-5 w-5 text-gray-500" />
                                    <span>Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                                </Link>
                                {user ? (
                                    <>
                                        <Link to={user.isAdmin ? "/admin" : "/profile"} className="flex items-center space-x-3 text-gray-700 font-medium">
                                            <User className="h-5 w-5 text-gray-500" />
                                            <span>Profile ({user.name})</span>
                                        </Link>
                                        <button onClick={handleLogout} className="flex items-center w-full space-x-3 text-red-600 font-medium">
                                            <LogOut className="h-5 w-5" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="flex items-center space-x-3 text-gray-700 font-medium">
                                        <User className="h-5 w-5 text-gray-500" />
                                        <span>Login / Register</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

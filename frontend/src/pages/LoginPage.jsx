import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Copy, ShieldCheck, User } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const demoCredentials = [
        { label: 'Demo User', email: 'user@shopez.com', password: 'password123', icon: User, color: 'indigo' },
        { label: 'Admin Login', email: 'admin@shopez.com', password: 'password123', icon: ShieldCheck, color: 'orange' },
    ];

    const handleFillCredentials = (cred) => {
        setEmail(cred.email);
        setPassword(cred.password);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 flex flex-col items-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full mt-8"
            >
                {/* Demo Credentials Cards */}
                <div className="mb-6 space-y-3">
                    <p className="text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Quick Login — Click to Auto-Fill</p>
                    {demoCredentials.map((cred) => (
                        <motion.div
                            key={cred.email}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleFillCredentials(cred)}
                            className={`cursor-pointer rounded-xl border-2 p-4 transition-all shadow-sm hover:shadow-md ${
                                cred.color === 'orange'
                                    ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 hover:border-orange-400'
                                    : 'border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 hover:border-indigo-400'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        cred.color === 'orange' ? 'bg-orange-100' : 'bg-indigo-100'
                                    }`}>
                                        <cred.icon className={`w-5 h-5 ${cred.color === 'orange' ? 'text-orange-600' : 'text-indigo-600'}`} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">{cred.label}</p>
                                        <p className="text-xs text-gray-500 font-mono">{cred.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] bg-white border rounded-full px-2 py-0.5 text-gray-500 font-mono">
                                        {cred.password}
                                    </span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); copyToClipboard(cred.email); }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Copy email"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Welcome Back
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Sign in to your SHOP<span className="text-orange-500 font-bold">EZ</span> account</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={submitHandler} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm bg-gray-50 placeholder-gray-400"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm bg-gray-50 placeholder-gray-400"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all text-sm shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-xs">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

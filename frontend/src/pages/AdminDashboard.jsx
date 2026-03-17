import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Eye, Image as ImageIcon } from 'lucide-react';

const Sidebar = ({ currentPath }) => {
    const links = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Users', path: '/admin/users', icon: Users },
    ];

    return (
        <div className="w-64 bg-slate-950 min-h-[calc(100vh-80px)] text-white p-6 shrink-0 hidden lg:block sticky top-20 border-r border-slate-800">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-1">Admin Panel</h2>
                <p className="text-gray-400 text-sm">ShopEZ Control Center</p>
            </div>
            <nav className="space-y-2">
                {links.map(link => {
                    const isActive = currentPath === link.path;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, trend, trendUp }) => (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-700">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                <Icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
                <span>{trend}</span>
                {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const location = useLocation();

    const recentOrders = [
        { id: 'ORD-001', user: 'Sarah Jennings', date: '2026-03-06', amount: '₹428.00', status: 'Delivered' },
        { id: 'ORD-002', user: 'Michael Chen', date: '2026-03-05', amount: '₹799.00', status: 'Processing' },
        { id: 'ORD-003', user: 'Emily Davis', date: '2026-03-04', amount: '₹129.00', status: 'Shipped' },
        { id: 'ORD-004', user: 'John Doe', date: '2026-03-03', amount: '₹54.00', status: 'Delivered' },
    ];

    return (
        <div className="flex bg-slate-900 min-h-screen pt-20">
            <Sidebar currentPath={location.pathname} />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-gray-400 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Revenue" value="₹45,231.89" icon={DollarSign} trend="+12.5%" trendUp={true} />
                    <StatCard title="Total Orders" value="1,245" icon={ShoppingCart} trend="+5.2%" trendUp={true} />
                    <StatCard title="Total Products" value="342" icon={Package} trend="-1.5%" trendUp={false} />
                    <StatCard title="Total Users" value="8,921" icon={Users} trend="+18.2%" trendUp={true} />
                </div>

                {/* Recent Orders Table */}
                <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white">Recent Orders</h2>
                        <Link to="/admin/orders" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-medium">Order ID</th>
                                    <th className="py-4 px-6 font-medium">Customer</th>
                                    <th className="py-4 px-6 font-medium">Date</th>
                                    <th className="py-4 px-6 font-medium">Amount</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                    <th className="py-4 px-6 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {recentOrders.map((order, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={order.id}
                                        className="hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="py-4 px-6 font-medium text-white">{order.id}</td>
                                        <td className="py-4 px-6 text-gray-300">{order.user}</td>
                                        <td className="py-4 px-6 text-gray-300">{order.date}</td>
                                        <td className="py-4 px-6 font-medium text-white">{order.amount}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                order.status === 'Processing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                                                <Eye className="w-5 h-5 ml-auto" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;

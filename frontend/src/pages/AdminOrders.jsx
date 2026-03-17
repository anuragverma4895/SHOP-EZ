import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Search, Edit, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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

const AdminOrders = () => {
    const location = useLocation();

    const dummyOrders = [
        { id: 'ORD-001', user: 'Sarah Jennings', date: '2026-03-06', amount: 428.00, isPaid: true, status: 'Delivered' },
        { id: 'ORD-002', user: 'Michael Chen', date: '2026-03-05', amount: 799.00, isPaid: true, status: 'Processing' },
        { id: 'ORD-003', user: 'Emily Davis', date: '2026-03-04', amount: 129.00, isPaid: false, status: 'Shipped' },
        { id: 'ORD-004', user: 'John Doe', date: '2026-03-03', amount: 54.00, isPaid: true, status: 'Cancelled' },
        { id: 'ORD-005', user: 'Alice Smith', date: '2026-03-02', amount: 210.50, isPaid: true, status: 'Processing' },
    ];

    return (
        <div className="flex bg-slate-900 min-h-screen pt-20">
            <Sidebar currentPath={location.pathname} />

            <div className="flex-1 p-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Orders</h1>
                        <p className="text-gray-400 mt-1">View and update customer orders</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-medium">Order ID</th>
                                    <th className="py-4 px-6 font-medium">Customer</th>
                                    <th className="py-4 px-6 font-medium">Date</th>
                                    <th className="py-4 px-6 font-medium">Amount</th>
                                    <th className="py-4 px-6 font-medium">Paid</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {dummyOrders.map((order, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={order.id}
                                        className="hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="py-4 px-6 text-sm text-indigo-400 font-medium">{order.id}</td>
                                        <td className="py-4 px-6 font-medium text-white">{order.user}</td>
                                        <td className="py-4 px-6 text-gray-300 text-sm">{order.date}</td>
                                        <td className="py-4 px-6 text-white font-medium">₹{order.amount.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${order.isPaid ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {order.isPaid ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                className={`text-xs font-bold px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    order.status === 'Processing' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                                        order.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                    }`}
                                                defaultValue={order.status}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="text-sm border border-slate-600 bg-slate-800 px-3 py-1.5 rounded-lg text-gray-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors shadow-sm font-medium">
                                                Details
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-700 flex justify-between items-center text-sm text-gray-400">
                        <span>Showing 1 to 5 of 1,245 orders</span>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">Prev</button>
                            <button className="px-3 py-1 border rounded bg-indigo-500/20 text-indigo-400 border-indigo-500/30 font-medium">1</button>
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">2</button>
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminOrders;
